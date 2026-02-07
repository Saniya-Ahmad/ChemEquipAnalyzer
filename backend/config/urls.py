from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path, include

urlpatterns = [
    path("", lambda request: HttpResponseRedirect("/admin/")),
    path("admin/", admin.site.urls),
    path("api/", include("equipment.urls")),
]
