from calculator.serializers import InvestmentRequestSerializer
from calculator.models import Product, FundsSetting, Holiday
from datetime import datetime, timedelta


def get_valid_date(dt):
    valid = False

    while not valid:
        if dt.weekday() in [5, 6]:
            monday_diff = 7 - dt.weekday()
            dt = dt + timedelta(days=monday_diff)

        valid = True

        if Holiday.objects.is_holiday(dt.date()):
            valid = False
            dt = dt + timedelta(days=1)

    return dt


class CalculatorService:

    def __init__(self, investment: InvestmentRequestSerializer):
        self.investment = investment
        self.product = Product.objects.get(pk=investment['producto'])
        self.operational_hour = FundsSetting.objects.get(pk=1).operational_hour

    def calculate(self):
        # Las inversiones deberian crearse en un dia laborable pero revisamos
        created_dt = datetime.strptime(self.investment['fechaCreacion'], '%Y-%m-%dT%H:%M:%SZ')
        investment_period = self.investment['plazo']
        is_reinvestment = self.investment['enReinversion']
        is_op_hour = created_dt.time() <= self.operational_hour

        created_dt = get_valid_date(created_dt)
        init_dt = self.calculate_init_date(created_dt, is_reinvestment, is_op_hour)
        end_dt = init_dt + timedelta(days=investment_period)
        end_dt = get_valid_date(end_dt)

        real_period = (end_dt - init_dt).days

        data = {
            'producto': self.investment['producto'],
            'plazo': investment_period,
            'fechaInicio': init_dt,
            'fechaFin': end_dt,
            'plazoReal': real_period
        }

        return data

    def calculate_init_date(self, created_dt, is_reinvestment, is_op_hour):
        if is_reinvestment:
            if is_op_hour:
                days_offset = self.product.days_lte_reinvest
            else:
                days_offset = self.product.days_gt_reinvest
        else:
            if is_op_hour:
                days_offset = self.product.days_lte
            else:
                days_offset = self.product.days_gt

        init_dt = created_dt + timedelta(days=days_offset)
        return get_valid_date(init_dt)
