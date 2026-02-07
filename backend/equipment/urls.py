from django.urls import path
from .views import UploadCSV, LatestSummary, History, PDFReport

urlpatterns = [
    path("upload/", UploadCSV.as_view()),
    path("summary/latest/", LatestSummary.as_view()),
    path("history/", History.as_view()),
    path("report/pdf/", PDFReport.as_view()),
]
