from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel, QTableWidget, QTableWidgetItem, QHeaderView, QPushButton
from ui.upload import UploadWidget
from ui.charts import ChartsWidget
from api.client import get_latest_summary, get_history, download_pdf
from PyQt5.QtWidgets import QMessageBox

class DashboardWindow(QWidget):
    def __init__(self, auth):
        super().__init__()
        self.auth = auth
        self.setWindowTitle("Chemical Equipment Dashboard")
        self.setGeometry(300, 50, 800, 600)

        self.layout = QVBoxLayout()
        self.setLayout(self.layout)

        # Upload CSV
        self.upload_widget = UploadWidget(auth, self.load_data)
        self.layout.addWidget(self.upload_widget)

        # Summary Labels
        self.summary_labels = {}
        for key in ["total_count","avg_flowrate","avg_pressure","avg_temperature"]:
            label = QLabel()
            self.layout.addWidget(label)
            self.summary_labels[key] = label

        # Charts placeholder
        self.chart_widget = None

        # History Table
        self.history_table = QTableWidget()
        self.history_table.setColumnCount(5)
        self.history_table.setHorizontalHeaderLabels(["Dataset","Total","Flowrate","Pressure","Temperature"])
        self.history_table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        self.layout.addWidget(self.history_table)

        # PDF Download
        self.pdf_btn = QPushButton("Download PDF Report")
        self.pdf_btn.clicked.connect(self.download_pdf)
        self.layout.addWidget(self.pdf_btn)

        self.load_data()

    def load_data(self):
        try:
            summary = get_latest_summary(self.auth)
            for key in self.summary_labels:
                self.summary_labels[key].setText(f"{key.replace('_',' ').title()}: {summary[key]}")

            # Charts
            if self.chart_widget:
                self.layout.removeWidget(self.chart_widget)
                self.chart_widget.deleteLater()
            self.chart_widget = ChartsWidget(summary)
            self.layout.insertWidget(5, self.chart_widget)

            # History
            history = get_history(self.auth)
            self.history_table.setRowCount(len(history))
            for i, item in enumerate(history):
                self.history_table.setItem(i,0,QTableWidgetItem(item.get("dataset_name", f"Dataset {i+1}")))
                self.history_table.setItem(i,1,QTableWidgetItem(str(item.get("total_count"))))
                self.history_table.setItem(i,2,QTableWidgetItem(str(item.get("avg_flowrate"))))
                self.history_table.setItem(i,3,QTableWidgetItem(str(item.get("avg_pressure"))))
                self.history_table.setItem(i,4,QTableWidgetItem(str(item.get("avg_temperature"))))
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to load data: {str(e)}")

    def download_pdf(self):
        try:
            download_pdf(self.auth, "report.pdf")
            QMessageBox.information(self, "Success", "PDF downloaded as report.pdf")
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to download PDF: {str(e)}")
