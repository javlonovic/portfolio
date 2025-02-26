from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import Skill, Project, ContactInfo, SocialLink, Profile

def home(request):
    skills = Skill.objects.all()
    projects = Project.objects.all()
    social_links = SocialLink.objects.all()
    contact_info = ContactInfo.objects.first()
    profile = Profile.objects.first()
    
    context = {
        'skills': skills,
        'projects': projects,
        'social_links': social_links,
        'contact_info': contact_info,
        'profile': profile,
    }
    
    return render(request, 'portfolio/index.html', context)

def contact(request):
    contact_info = ContactInfo.objects.first()
    
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')
        
        # Send email (configure your email backend in settings.py for this to work)
        try:
            subject = f"Portfolio Contact: Message from {name}"
            message_body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
            send_mail(
                subject,
                message_body,
                email,  # From email
                [contact_info.email],  # To email
                fail_silently=False,
            )
            messages.success(request, "Thank you for your message! I'll get back to you soon.")
            return redirect('portfolio:home')
        except Exception as e:
            messages.error(request, f"There was an error sending your message. Please try again later.")
    
    return redirect('portfolio:home')