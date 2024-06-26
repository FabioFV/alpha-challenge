from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    days_lte = models.PositiveIntegerField()
    days_gt = models.PositiveIntegerField()
    days_lte_reinvest = models.PositiveIntegerField()
    days_gt_reinvest = models.PositiveIntegerField()
    enabled = models.BooleanField(default=True)


class HolidayManager(models.Manager):
    def is_holiday(self, check_date):
        try:
            holiday = self.get(holiday_date=check_date)
            return True
        except Holiday.DoesNotExist:
            return False


class Holiday(models.Model):
    name = models.CharField(max_length=50, blank=False, default='')
    holiday_date = models.DateField(unique=True)

    objects = HolidayManager()


class FundsSetting(models.Model):
    operational_hour = models.TimeField()
