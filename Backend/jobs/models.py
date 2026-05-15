# jobs/models.py

from django.db import models
from django.utils import timezone

from accounts.models import EmployerProfile, WorkerProfile


class Job(models.Model):

    class JobType(models.TextChoices):
        FULL_TIME_CONTRACT = "FULL_TIME_CONTRACT", "Full-time Contract"
        PART_TIME_CONTRACT = "PART_TIME_CONTRACT", "Part-time Contract"
        PROJECT_BASED = "PROJECT_BASED", "Project-based"
        FREELANCE = "FREELANCE", "Freelance"

    class JobStatus(models.TextChoices):
        OPEN = "OPEN", "Open"
        CLOSED = "CLOSED", "Closed"

    # Employer Foreign Key
    employer = models.ForeignKey(
        EmployerProfile,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    # Frontend Job Fields
    title = models.CharField(max_length=255)

    company = models.CharField(max_length=255)

    location = models.CharField(max_length=255)

    match_score = models.PositiveIntegerField(default=0)

    skills = models.JSONField(default=list)

    salary = models.CharField(
        max_length=100,
        blank=True
    )

    # Extra Fields
    description = models.TextField()

    requirements = models.TextField(blank=True)

    job_type = models.CharField(
        max_length=30,
        choices=JobType.choices,
        default=JobType.FULL_TIME_CONTRACT
    )

    status = models.CharField(
        max_length=20,
        choices=JobStatus.choices,
        default=JobStatus.OPEN
    )

    deadline = models.DateField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(default=timezone.now)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class JobApplication(models.Model):

    class ApplicationStatus(models.TextChoices):
        PENDING = "PENDING", "Pending"
        ACCEPTED = "ACCEPTED", "Accepted"
        REJECTED = "REJECTED", "Rejected"

    # Job Foreign Key
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    # Worker Foreign Key
    worker = models.ForeignKey(
        WorkerProfile,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    cover_letter = models.TextField(blank=True)

    resume_link = models.URLField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.PENDING
    )

    applied_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ["job", "worker"]

    def __str__(self):
        return f"{self.worker.user.full_name} -> {self.job.title}"