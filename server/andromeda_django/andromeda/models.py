from django.db import models

class JournalEntry(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Attachment(models.Model):
    entry = models.ForeignKey(JournalEntry, related_name='attachments', on_delete=models.CASCADE)
    file_url = models.URLField()
    file_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    entries = models.ManyToManyField(JournalEntry, related_name='tags')