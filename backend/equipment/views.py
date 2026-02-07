from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser  # 🔹 ADD THIS
from .models import Dataset
from .serializers import DatasetSerializer
from .utils import analyze_csv
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from django.http import FileResponse
class UploadCSV(APIView):
    # permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        try:
            summary = analyze_csv(file)

            dataset_fields = [
                "total_count",
                "avg_flowrate",
                "avg_pressure",
                "avg_temperature",
                "type_distribution"
            ]

            filtered_summary = {k: summary[k] for k in dataset_fields if k in summary}

            Dataset.objects.create(**filtered_summary)

            datasets = Dataset.objects.order_by("-uploaded_at")

            if datasets.count() > 5:
             datasets.last().delete()

            return Response(summary)

        except ValueError as e:
            return Response({"error": str(e)}, status=400)
        except Exception as e:
            return Response({"error": f"Failed to process CSV: {str(e)}"}, status=400)
class LatestSummary(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        latest = Dataset.objects.last()
        return Response(DatasetSerializer(latest).data)

class History(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = Dataset.objects.order_by("-uploaded_at")
        return Response(DatasetSerializer(data, many=True).data)

class PDFReport(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        dataset = Dataset.objects.last()
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
