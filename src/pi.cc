#include <nan.h>
#include <cstdlib>

#include "pi.h"

using v8::Function;
using v8::Local;
using v8::Number;
using v8::Value;
using Nan::AsyncQueueWorker;
using Nan::AsyncWorker;
using Nan::Callback;
using Nan::HandleScope;
using Nan::New;
using Nan::Null;
using Nan::To;

inline int randall(unsigned int *p_seed) {
#ifdef _WIN32
  return rand();  // NOLINT(runtime/threadsafe_fn)
#else
  return rand_r(p_seed);
#endif
}

double Estimate (int points) {
  int i = points;
  int inside = 0;
  unsigned int randseed = 1;

#ifdef _WIN32
  srand(randseed);
#endif

  // unique seed for each run, for threaded use
  unsigned int seed = randall(&randseed);

#ifdef _WIN32
  srand(seed);
#endif

  while (i-- > 0) {
    double x = randall(&seed) / static_cast<double>(RAND_MAX);
    double y = randall(&seed) / static_cast<double>(RAND_MAX);

    // x & y and now values between 0 and 1
    // now do a pythagorean diagonal calculation
    // `1` represents our 1/4 circle
    if ((x * x) + (y * y) <= 1)
      inside++;
  }

  // calculate ratio and multiply by 4 for π
  return (inside / static_cast<double>(points)) * 4;
}

class PiWorker : public AsyncWorker {
 public:
  PiWorker(Callback *callback, int points) : AsyncWorker(callback), points(points), estimate(0) {}
  ~PiWorker() {}

  void Execute () {
    estimate = Estimate(points);
  }

  void HandleOKCallback () {
    HandleScope scope;

    Local<Value> argv[] = {
        Null(),
        New<Number>(estimate)
    };

    callback->Call(2, argv);
  }

 private:
  int points;
  double estimate;
};

NAN_METHOD(Calculate) {
  int points = To<int>(info[0]).FromJust();
  Callback *callback = new Callback(info[1].As<Function>());

  AsyncQueueWorker(new PiWorker(callback, points));
}