from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from drf_spectacular.utils import extend_schema

from .models import Job
from .serializers import JobSerializer

from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from .serializers import JobDetailSerializer

from .serializers import JobListSerializer



class CreateJobView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        tags=["Jobs"],
        request=JobSerializer,
        responses=JobSerializer,
        description="Employer creates a new job posting"
    )
    def post(self, request):
        user = request.user

        # ensure only employers can create jobs
        if user.role != "EMPLOYER":
            return Response(
                {"success": False, "message": "Only employers can create jobs"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = JobSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            job = serializer.save()

            return Response(
                {
                    "success": True,
                    "message": "Job created successfully",
                    "data": JobSerializer(job).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            {
                "success": False,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class ListJobsView(APIView):

    @extend_schema(
        tags=["Jobs"],
        responses=JobListSerializer(many=True),
        description="Get all available jobs"
    )
    def get(self, request):

        jobs = Job.objects.filter(status="OPEN").order_by("-created_at")

        serializer = JobListSerializer(jobs, many=True)

        return Response(
            {
                "success": True,
                "message": "Jobs fetched successfully",
                "count": jobs.count(),
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

# jobs/views.py


@extend_schema(
    tags=["Jobs"],
)
class JobDetailView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "id"