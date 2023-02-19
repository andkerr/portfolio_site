### SICP Diary - Chapter 1

_February 2023_

Harold Abelson, Gerald Sussman, and Julie Sussman's _Structure and Interpretation of Computer Programs_ seems like one of those books you just have to read if you want to get a deep grasp on a certain something about computer science. I'm not the one to say what exactly, but if gurus like [Peter Norvig](https://www.amazon.com/review/R403HR4VL71K8) and [Paul Graham](https://www.amazon.com/review/R3G05B1TQ5XGZP) have run to Amazon to leave 5-star reviews, I think it's worth checking out.

What's more, the entire book is avaialable in HTML format [online](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html)! I bought a hard copy like a dinosaur, and am planning on working through the exercises over the next few months (and probably more diligently after I graduate from university in April).

SICP uses Scheme, a minimal Lisp dialect, as its teaching language. It's still possible to install the [distribution](https://www.gnu.org/software/mit-scheme/) of Scheme that MIT (until recently) used for their introduction to computer science course, but I am opting to complete the book's exercise in Racket instead. Thanks to its support for other Lisp dialects, it's possible to use a SICP-compatible version of Scheme by putting `#lang sicp` at the beginning of your programs.

Anyway, let's go!

#### Building Abstractions with Procedures

```lisp
    ; Exercise 1.3
;
; Define a procedure that takes three numbers as arguments and
; returns the sum of the squares of the two larger numbers.

(define (sum-of-squares-largest x y z)
  (cond ((= x (min x y z)) (sum-of-squares y z))
        ((= y (min x y z)) (sum-of-squares x z))
        (else (sum-of-squares x y))))

(define (min a b c)
  (cond ((and (< a b) (< a c)) a)
        ((and (< b a) (< b c)) b)
        (else c))

(define (sum-of-squares x y)
  (+ (square x) (square y)))

(define (square x) (* x x))
```
