import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from "@angular/common/http";
import { tap, combineAll } from "rxjs/operators";

export class LogginInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Outgoing request");
        console.log(req.url);
        return next.handle(req).pipe(
            tap(
                event => {
                    if (event.type === HttpEventType.Response) {
                        console.log("Incoming Response")
                        console.log(event.body);
                    }
                }
            )
        );
    }
}