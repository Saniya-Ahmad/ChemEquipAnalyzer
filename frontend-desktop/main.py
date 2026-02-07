import sys
from PyQt5.QtWidgets import QApplication
from ui.login import LoginWindow
from ui.dashboard import DashboardWindow

def main():
    app = QApplication(sys.argv)
    def start_dashboard(auth):
        dashboard = DashboardWindow(auth)
        dashboard.show()
    login = LoginWindow(on_login=start_dashboard)
    login.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
