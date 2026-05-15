from rest_framework import serializers
from .models import Job




class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "description",
            "location",
            "salary",
            "skills",
            "job_type",
        ]
        read_only_fields = ["id"]

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user

        # ensure employer profile exists
        employer_profile = user.employerprofile

        job = Job.objects.create(
            employer=employer_profile,
            company=employer_profile.company_name,
            **validated_data
        )

        return job


class JobListSerializer(serializers.ModelSerializer):
    company = serializers.CharField(read_only=True)
    matchScore = serializers.IntegerField(source="match_score")

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "company",
            "location",
            "matchScore",
            "skills",
            "salary",
        ]




class JobDetailSerializer(serializers.ModelSerializer):
    company = serializers.CharField(read_only=True)
    matchScore = serializers.IntegerField(source="match_score")

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "company",
            "location",
            "matchScore",
            "skills",
            "salary",
            "description",
            "requirements",
            "job_type",
            "status",
            "created_at",
        ]