from django.urls import path
from .views import CreateJobView, JobDetailView, ListJobsView

urlpatterns = [
    path("jobs/create/", CreateJobView.as_view(), name="create-job"),
    path("jobs/", ListJobsView.as_view(), name="list-jobs"),
    path("jobs/<int:id>/", JobDetailView.as_view(), name="job-detail"),
]