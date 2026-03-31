from .models import Subject,Course,Paper
from .serializers import SubjectSerializer, CourseSerializer, PaperSerializer
from rest_framework import generics
from rest_framework.filters import SearchFilter

class SubjectListCreate(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class CourseListCreate(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filterset_fields = ['subject']



class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class PaperListCreate(generics.ListCreateAPIView):
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer
    filterset_fields = ['course']


class PaperDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer