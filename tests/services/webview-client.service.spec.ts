import { inject, TestBed } from '@angular/core/testing';

import { WebviewClientService } from './../../integrity-webview-client';

describe('WebviewClientService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebviewClientService
      ]
    });
  });

  it('init promise',
    inject([WebviewClientService],
      (client: WebviewClientService) => {
        client.init().then((data: any) => expect(data.test).toEqual('data'));
        (window as any)['com.brickchain.integrity.init']('{"test":"data"}');
      })
  );

});
