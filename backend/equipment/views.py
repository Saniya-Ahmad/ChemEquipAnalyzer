from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse

from .models import Dataset
from .serializers import DatasetSerializer
from .utils import analyze_csv

from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
class UploadCSV(APIView):
    # 🔐 Optional: protect upload
    # permission_classes = [IsAuthenticated]

    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        try:
            summary = analyze_csv(file)

            Dataset.objects.create(
                total_count=summary["total_count"],
                avg_flowrate=summary["avg_flowrate"],
                avg_pressure=summary["avg_pressure"],
                avg_temperature=summary["avg_temperature"],
                type_distribution=summary["type_distribution"],
            )

            # keep last 5 datasets only
            datasets = Dataset.objects.order_by("-uploaded_at")
            if datasets.count() > 5:
                datasets.last().delete()

            return Response(summary)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
class LatestSummary(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        latest = Dataset.objects.last()
        if not latest:
            return Response({"message": "No data available"})
        return Response(DatasetSerializer(latest).data)
class History(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data = Dataset.objects.order_by("-uploaded_at")
        return Response(DatasetSerializer(data, many=True).data)
class PDFReport(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        dataset = Dataset.objects.last()
        if not dataset:
            return Response({"error": "No data available"}, status=400)

        file_path = "report.pdf"

        doc = SimpleDocTemplate(file_path)
        styles = getSampleStyleSheet()
        content = [
            Paragraph(f"Total Equipment: {dataset.total_count}", styles["Normal"]),
            Paragraph(f"Avg Flowrate: {dataset.avg_flowrate}", styles["Normal"]),
            Paragraph(f"Avg Pressure: {dataset.avg_pressure}", styles["Normal"]),
            Paragraph(f"Avg Temperature: {dataset.avg_temperature}", styles["Normal"]),
        ]

        doc.build(content)
        return FileResponse(open(file_path, "rb"), as_attachment=True)
