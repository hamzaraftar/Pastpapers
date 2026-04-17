from rest_framework import serializers
from .models import Course, Paper, Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']

class CourseSerializer(serializers.ModelSerializer):   
    subject = serializers.StringRelatedField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'subject']

class PaperSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField()
    file = serializers.SerializerMethodField()

    class Meta:
        model = Paper
        fields = "__all__"

    def get_file(self, obj):
        if obj.file:
            url = obj.file.url
            # Ensure HTTPS
            if url.startswith("http://"):
                url = url.replace("http://", "https://")
            return url
        return None
    # file can't be empty and must be pdf
    def validate_file(self, value):
        if not value:
            raise serializers.ValidationError("File field cannot be empty.")
        
        if not value.name.lower().endswith(".pdf"):
            raise serializers.ValidationError("Only PDF files are allowed.")
        
        return value

    # paper type must be either midterm or final
    def validate_paper_type(self, value):
        if value not in ["midterm", "final"]:
            raise serializers.ValidationError(
                "Paper type must be either 'midterm' or 'final'."
            )
        return value