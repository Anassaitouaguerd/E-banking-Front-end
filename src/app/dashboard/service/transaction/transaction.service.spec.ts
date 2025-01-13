import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch transactions', () => {
    const mockTransactions = [{ id: 1, amount: 100 }];
    service.getAllTransactions().subscribe((transactions) => {
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/transactions');
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
