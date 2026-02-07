from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure

class ChartsWidget(QWidget):
    def __init__(self, summary):
        super().__init__()
        self.summary = summary

        layout = QVBoxLayout()
        layout.addWidget(QLabel("Equipment Type Distribution"))

        fig = Figure(figsize=(4,3))
        self.canvas = FigureCanvas(fig)
        layout.addWidget(self.canvas)

        self.ax = fig.add_subplot(111)
        self.draw_chart()
        self.setLayout(layout)

    def draw_chart(self):
        self.ax.clear()
        types = list(self.summary['type_distribution'].keys())
        counts = list(self.summary['type_distribution'].values())
        self.ax.pie(counts, labels=types, autopct='%1.1f%%', startangle=90)
        self.ax.axis('equal')
        self.canvas.draw()
