from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon_class = models.CharField(max_length=100, help_text="Font Awesome class name (e.g., 'fab fa-python')")
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    icon_class = models.CharField(max_length=100, help_text="Font Awesome class for project icon (if no image)", default='fas fa-code')
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order']

class Technology(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='technologies')
    
    def __str__(self):
        return f"{self.name} - {self.project.title}"

class ContactInfo(models.Model):
    email = models.EmailField()
    telegram = models.CharField(max_length=100)
    github = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    
    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = "Contact Information"

class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('telegram', 'Telegram'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter'),
        ('instagram', 'Instagram'),
        ('facebook', 'Facebook'),
        ('other', 'Other'),
    ]
    
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    url = models.URLField()
    icon_class = models.CharField(max_length=100, help_text="Font Awesome class (e.g., 'fab fa-github')")
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.get_platform_display()
    
    class Meta:
        ordering = ['order']

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    
    def __str__(self):
        return self.name