# Generated by Django 5.1.6 on 2025-02-26 14:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('telegram', models.CharField(max_length=100)),
                ('github', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name_plural': 'Contact Information',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('bio', models.TextField()),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='profile/')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='projects/')),
                ('icon_class', models.CharField(default='fas fa-code', help_text='Font Awesome class for project icon (if no image)', max_length=100)),
                ('github_url', models.URLField(blank=True, null=True)),
                ('live_url', models.URLField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('icon_class', models.CharField(help_text="Font Awesome class name (e.g., 'fab fa-python')", max_length=100)),
                ('description', models.TextField()),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='SocialLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.CharField(choices=[('github', 'GitHub'), ('telegram', 'Telegram'), ('linkedin', 'LinkedIn'), ('twitter', 'Twitter'), ('instagram', 'Instagram'), ('facebook', 'Facebook'), ('other', 'Other')], max_length=50)),
                ('url', models.URLField()),
                ('icon_class', models.CharField(help_text="Font Awesome class (e.g., 'fab fa-github')", max_length=100)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Technology',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='technologies', to='portfolio.project')),
            ],
        ),
    ]
