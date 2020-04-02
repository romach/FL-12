import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should return "Unknown card type" message on invalid credit type', () => {
    expect(service.testCreditCard('123', 'Invalid')).toEqual({ isValid: false, message: 'Unknown card type' })
  });

  it('should return "Credit card number is in invalid format" message on short card number', () => {
    expect(service.testCreditCard('123456789012', 'Visa')).toEqual({ isValid: false, message: 'Credit card number is in invalid format' })
  })

  it('should return "Credit card number is in invalid format" message on long card number', () => {
    expect(service.testCreditCard('12345678901234567890', 'Visa')).toEqual({ isValid: false, message: 'Credit card number is in invalid format' })
  })

  it('should return "Credit card number is in invalid format" message if card number contains letter', () => {
    expect(service.testCreditCard('A234567890123', 'Visa')).toEqual({ isValid: false, message: 'Credit card number is in invalid format' })
  })

  it('should return "Credit card number is invalid" message if ten digits module is invalid', () => {
    expect(service.testCreditCard('4111 1111 1111 1112', 'Visa')).toEqual({ isValid: false, message: 'Credit card number is invalid' })
  })

  it('should return "Credit card number is invalid" message if card number prefix is invalid', () => {
    expect(service.testCreditCard('3111 1111 1111 1113', 'Visa')).toEqual({ isValid: false, message: 'Credit card number is invalid' })
  })

  it('should return "Warning! This credit card number is associated with a scam attempt" message if card has scam number', () => {
    expect(service.testCreditCard('5490997771092064', 'MasterCard')).toEqual({ isValid: false, message: 'Warning! This credit card number is associated with a scam attempt' })
  })

  it('should return "Credit card number has an inappropriate number of digits" message if card number has wrong length', () => {
    expect(service.testCreditCard('5500 0000 00 0004', 'MasterCard')).toEqual({ isValid: false, message: 'Credit card number has an inappropriate number of digits' })
  })

  it('should return "Credit card has a valid format" message if card is valid', () => {
    expect(service.testCreditCard('5500 0000 0000 0004', 'MasterCard')).toEqual({ isValid: true, message: 'Credit card has a valid format' })
  })
});
