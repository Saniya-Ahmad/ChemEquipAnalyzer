from django.db import models

class Dataset(models.Model):

    total_count = models.IntegerField(default=0)

    avg_flowrate = models.FloatField(default=0)
    avg_pressure = models.FloatField(default=0)
    avg_temperature = models.FloatField(default=0)

    type_distribution = models.JSONField(default=dict, blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)
