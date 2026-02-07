from PyQt5.QtWidgets import QWidget, QVBoxLayout, QPushButton, QFileDialog, QMessageBox
from api.client import upload_csv

class UploadWidget(QWidget):
    def __init__(self, auth, refresh_callback):
        super().__init__()
        self.auth = auth
        self.refresh_callback = refresh_callback

        layout = QVBoxLayout()
        self.upload_btn = QPushButton("Upload CSV")
        self.upload_btn.clicked.connect(self.upload_file)
        layout.addWidget(self.upload_btn)

        self.setLayout(layout)

    def upload_file(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Select CSV File", "", "CSV Files (*.csv)")
        if file_path:
            try:
                upload_csv(file_path, self.auth)
                QMessageBox.information(self, "Success", "File uploaded successfully")
                self.refresh_callback()  # reload summary & history
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Upload failed: {str(e)}")
