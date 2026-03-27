from rest_framework import serializers
from .models import Course, Paper, Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']

class CourseSerializer(serializers.ModelSerializer):
    subject = serializers.SlugRelatedField(
        queryset=Subject.objects.all(),
        slug_field='name'
    )    
    subject = serializers.StringRelatedField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'subject']

class PaperSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Paper
        fields = ['id', 'name', 'code', 'course', 'file']     

    # must be a pdf file
    def validate_file(self, value):
        if not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("Only PDF files are allowed.")
        return value