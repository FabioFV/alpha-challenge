from django.db import migrations
import datetime


def add_operational_time(apps, schema_editor):
    FundsSetting = apps.get_model("calculator", "FundsSetting")
    settings = FundsSetting(operational_hour=datetime.time(10, 30))
    settings.save()


def reverse_migration(apps, schema_editor):
    FundsSetting = apps.get_model("api", "FundsSetting")
    FundsSetting.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_operational_time, reverse_migration)
    ]
