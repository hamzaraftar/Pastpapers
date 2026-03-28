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
    

    class Meta:
        model = Paper
        fields = ['id','code','course', 'paper_type',   'file']     
   
    # file can't me empty and file must be pdf 
    def validate_file(self, value):
        if not value:
            raise serializers.ValidationError("File field cannot be empty.")
        
        if not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("Only PDF files are allowed.")
        return value
    
    # paper type must be either midterm or final
    def validate_paper_type(self, value):
        if value not in ['midterm', 'final']:
            raise serializers.ValidationError("Paper type must be either 'midterm' or 'final'.")
        return value
