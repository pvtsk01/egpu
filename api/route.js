const D = [
 {
  "w": 1,
  "t": "GPIO Programming — LED Blinking on Jetson Nano",
  "c": "import Jetson.GPIO as GPIO\nimport time\n\nLED = 12\nGPIO.setmode(GPIO.BOARD)\nGPIO.setup(LED, GPIO.OUT)\n\ntry:\n    while True:\n        GPIO.output(LED, GPIO.HIGH)\n        time.sleep(1)\n        GPIO.output(LED, GPIO.LOW)\n        time.sleep(1)\nexcept KeyboardInterrupt:\n    pass\nfinally:\n    GPIO.cleanup()"
 },
 {
  "w": 2,
  "t": "GPIO Programming for Traffic Light",
  "c": "import Jetson.GPIO as GPIO\nimport time\nRED, YELLOW, GREEN = 12, 16, 18\nGPIO.setmode(GPIO.BOARD)\nfor pin in [RED, YELLOW, GREEN]:\n    GPIO.setup(pin, GPIO.OUT)\ntry:\n    while True:\n        GPIO.output(RED, GPIO.HIGH)\n        time.sleep(3)\n        GPIO.output(RED, GPIO.LOW)\n\n        GPIO.output(YELLOW, GPIO.HIGH)\n        time.sleep(2)\n        GPIO.output(YELLOW, GPIO.LOW)\n\n        GPIO.output(GREEN, GPIO.HIGH)\n        time.sleep(3)\n        GPIO.output(GREEN, GPIO.LOW)\nexcept KeyboardInterrupt:\n    pass\nfinally:\n    GPIO.cleanup()"
 },
 {
  "w": 3,
  "t": "Interfacing Sensors and Actuators with Jetson Nano",
  "c": "import Jetson.GPIO as GPIO\nimport time\n\nTRIG, ECHO, LED = 16, 18, 12\n\nGPIO.setmode(GPIO.BOARD)\nGPIO.setup(TRIG, GPIO.OUT)\nGPIO.setup(ECHO, GPIO.IN)\nGPIO.setup(LED, GPIO.OUT)\n\ntry:\n    while True:\n        GPIO.output(TRIG, GPIO.LOW)\n        time.sleep(0.05)\n\n        GPIO.output(TRIG, GPIO.HIGH)\n        time.sleep(0.00001)\n        GPIO.output(TRIG, GPIO.LOW)\n\n        start = time.monotonic()\n        while GPIO.input(ECHO) == 0:\n            if time.monotonic() - start > 0.03:\n                break\n        pulse_start = time.monotonic()\n\n        while GPIO.input(ECHO) == 1:\n            if time.monotonic() - pulse_start > 0.03:\n                break\n        pulse_end = time.monotonic()\n\n        distance = (pulse_end - pulse_start) * 17150\n        print(\"Distance:\", round(distance, 2), \"cm\")\n\n        GPIO.output(LED, GPIO.HIGH if distance < 20 else GPIO.LOW)\n        time.sleep(0.5)\n\nexcept KeyboardInterrupt:\n    pass\nfinally:\n    GPIO.cleanup()"
 },
 {
  "w": 4,
  "t": "Interfacing Camera with Jetson Nano",
  "c": "import cv2\n\ncamera = cv2.VideoCapture(0)\n\nwhile camera.isOpened():\n    ret, frame = camera.read()\n    if not ret:\n        break\n\n    cv2.imshow(\"Jetson Nano Camera\", frame)\n\n    if cv2.waitKey(1) & 0xFF == ord('q'):\n        break\n\ncamera.release()\ncv2.destroyAllWindows()"
 },
 {
  "w": 5,
  "t": "Data Classification Using Jetson Nano",
  "c": "from sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\n\ndata = load_iris()\nmodel = DecisionTreeClassifier()\nmodel.fit(data.data, data.target)\n\nprediction = model.predict([[5.1, 3.5, 1.4, 0.2]])\nprint(\"Predicted Class:\", data.target_names[prediction[0]])"
 },
 {
  "w": 6,
  "t": "Squaring an Array Using a CUDA Kernel",
  "c": "#include <stdio.h>\n#include <cuda_runtime.h>\n\n__global__ void square(int *a) {\n    int i = threadIdx.x;\n    a[i] = a[i] * a[i];\n}\n\nint main() {\n    int a[5] = {1, 2, 3, 4, 5};\n    int *d;\n\n    cudaMalloc(&d, 5 * sizeof(int));\n    cudaMemcpy(d, a, 5 * sizeof(int), cudaMemcpyHostToDevice);\n\n    square<<<1, 5>>>(d);\n    cudaDeviceSynchronize();\n\n    cudaMemcpy(a, d, 5 * sizeof(int), cudaMemcpyDeviceToHost);\n\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", a[i]);\n\n    cudaFree(d);\n    return 0;\n}"
 },
 {
  "w": 7,
  "t": "Adding Two Large Vectors Using CUDA",
  "c": "#include <stdio.h>\n#include <cuda_runtime.h>\n\n__global__ void add(int *a, int *b, int *c) {\n    int i = threadIdx.x;\n    c[i] = a[i] + b[i];\n}\n\nint main() {\n    int a[5] = {1, 2, 3, 4, 5};\n    int b[5] = {6, 7, 8, 9, 10};\n    int c[5], *da, *db, *dc;\n\n    cudaMalloc(&da, 5 * sizeof(int));\n    cudaMalloc(&db, 5 * sizeof(int));\n    cudaMalloc(&dc, 5 * sizeof(int));\n\n    cudaMemcpy(da, a, sizeof(a), cudaMemcpyHostToDevice);\n    cudaMemcpy(db, b, sizeof(b), cudaMemcpyHostToDevice);\n\n    add<<<1, 5>>>(da, db, dc);\n    cudaDeviceSynchronize();\n\n    cudaMemcpy(c, dc, sizeof(c), cudaMemcpyDeviceToHost);\n\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", c[i]);\n\n    cudaFree(da);\n    cudaFree(db);\n    cudaFree(dc);\n    return 0;\n}"
 },
 {
  "w": 9,
  "t": "Matrix Multiplication Using CUDA",
  "c": "#include <stdio.h>\n#include <cuda_runtime.h>\n\n__global__ void multiply(int *a, int *b, int *c) {\n    int i = threadIdx.x;\n    int row = i / 2;\n    int col = i % 2;\n\n    c[i] = a[row * 2] * b[col]\n         + a[row * 2 + 1] * b[2 + col];\n}\n\nint main() {\n    int a[4] = {1, 2, 3, 4};\n    int b[4] = {5, 6, 7, 8};\n    int c[4], *da, *db, *dc;\n\n    cudaMalloc(&da, sizeof(a));\n    cudaMalloc(&db, sizeof(b));\n    cudaMalloc(&dc, sizeof(c));\n\n    cudaMemcpy(da, a, sizeof(a), cudaMemcpyHostToDevice);\n    cudaMemcpy(db, b, sizeof(b), cudaMemcpyHostToDevice);\n\n    multiply<<<1, 4>>>(da, db, dc);\n    cudaDeviceSynchronize();\n\n    cudaMemcpy(c, dc, sizeof(c), cudaMemcpyDeviceToHost);\n\n    for (int i = 0; i < 4; i++) {\n        printf(\"%d \", c[i]);\n        if (i % 2 == 1) printf(\"\\n\");\n    }\n\n    cudaFree(da);\n    cudaFree(db);\n    cudaFree(dc);\n    return 0;\n}"
 },
 {
  "w": 10,
  "t": "CUDA Application Profiling Using Timers",
  "c": "#include <stdio.h>\n#include <cuda_runtime.h>\n\n__global__ void square(int *a) {\n    int i = threadIdx.x;\n    a[i] = a[i] * a[i];\n}\n\nint main() {\n    int a[5] = {1, 2, 3, 4, 5};\n    int *d;\n    float time_ms;\n\n    cudaMalloc(&d, sizeof(a));\n    cudaMemcpy(d, a, sizeof(a), cudaMemcpyHostToDevice);\n\n    cudaEvent_t start, stop;\n    cudaEventCreate(&start);\n    cudaEventCreate(&stop);\n\n    cudaEventRecord(start);\n    square<<<1, 5>>>(d);\n    cudaEventRecord(stop);\n    cudaEventSynchronize(stop);\n\n    cudaEventElapsedTime(&time_ms, start, stop);\n    printf(\"Kernel Execution Time: %f ms\\n\", time_ms);\n\n    cudaEventDestroy(start);\n    cudaEventDestroy(stop);\n    cudaFree(d);\n\n    return 0;\n}"
 },
 {
  "w": 11,
  "t": "Finding the Minimum Among 100 Values Using CUDA",
  "c": "#include <stdio.h>\n#include <cuda_runtime.h>\n\n__global__ void findMin(int *a, int *result) {\n    int i = threadIdx.x;\n\n    if (i < 100 && a[i] < *result)\n        atomicMin(result, a[i]);\n}\n\nint main() {\n    int a[100], *d, *result;\n    int min = 9999;\n\n    for (int i = 0; i < 100; i++)\n        a[i] = 100 - i;\n\n    cudaMalloc(&d, sizeof(a));\n    cudaMalloc(&result, sizeof(int));\n\n    cudaMemcpy(d, a, sizeof(a), cudaMemcpyHostToDevice);\n    cudaMemcpy(result, &min, sizeof(int), cudaMemcpyHostToDevice);\n\n    findMin<<<1, 100>>>(d, result);\n    cudaDeviceSynchronize();\n\n    cudaMemcpy(&min, result, sizeof(int), cudaMemcpyDeviceToHost);\n\n    printf(\"Minimum Value: %d\\n\", min);\n\n    cudaFree(d);\n    cudaFree(result);\n    return 0;\n}"
 },
 {
  "w": 12,
  "t": "Matrix Multiplication Using OpenCL",
  "c": "#include <stdio.h>\n#include <CL/cl.h>\n\nconst char *src =\n\"__kernel void multiply(__global int *A,\"\n\"__global int *B, __global int *C) {\"\n\"int i = get_global_id(0);\"\n\"int r = i / 2, c = i % 2;\"\n\"C[i] = A[r*2]*B[c] + A[r*2+1]*B[2+c];\"\n\"}\";\n\nint main() {\n    int A[4] = {1,2,3,4};\n    int B[4] = {5,6,7,8};\n    int C[4];\n\n    cl_platform_id p;\n    cl_device_id d;\n    clGetPlatformIDs(1, &p, NULL);\n    clGetDeviceIDs(p, CL_DEVICE_TYPE_ALL, 1, &d, NULL);\n\n    cl_context ctx = clCreateContext(NULL, 1, &d,\n                                     NULL, NULL, NULL);\n    cl_command_queue q =\n        clCreateCommandQueue(ctx, d, 0, NULL);\n\n    cl_program prog = clCreateProgramWithSource(\n        ctx, 1, &src, NULL, NULL);\n    clBuildProgram(prog, 1, &d, NULL, NULL, NULL);\n\n    cl_kernel k = clCreateKernel(prog, \"multiply\", NULL);\n\n    cl_mem a = clCreateBuffer(ctx, CL_MEM_READ_ONLY |\n        CL_MEM_COPY_HOST_PTR, sizeof(A), A, NULL);\n    cl_mem b = clCreateBuffer(ctx, CL_MEM_READ_ONLY |\n        CL_MEM_COPY_HOST_PTR, sizeof(B), B, NULL);\n    cl_mem c = clCreateBuffer(ctx, CL_MEM_WRITE_ONLY,\n        sizeof(C), NULL, NULL);\n\n    clSetKernelArg(k, 0, sizeof(a), &a);\n    clSetKernelArg(k, 1, sizeof(b), &b);\n    clSetKernelArg(k, 2, sizeof(c), &c);\n\n    size_t n = 4;\n    clEnqueueNDRangeKernel(q, k, 1, NULL, &n,\n                           NULL, 0, NULL, NULL);\n    clFinish(q);\n    clEnqueueReadBuffer(q, c, CL_TRUE, 0, sizeof(C),\n                        C, 0, NULL, NULL);\n\n    for (int i = 0; i < 4; i++) {\n        printf(\"%d \", C[i]);\n        if (i % 2 == 1) printf(\"\\n\");\n    }\n\n    return 0;\n}"
 },
 {
  "w": 13,
  "t": "Matrix Transpose and Trace Using OpenCL",
  "c": "#include <stdio.h>\n#include <CL/cl.h>\n\nconst char *src =\n\"__kernel void calc(__global int *A, __global int *T) {\"\n\"int i = get_global_id(0);\"\n\"T[(i%2)*2 + i/2] = A[i];\"\n\"}\";\n\nint main() {\n    int A[4] = {1, 2, 3, 4};\n    int T[4];\n\n    cl_platform_id p;\n    cl_device_id d;\n    clGetPlatformIDs(1, &p, NULL);\n    clGetDeviceIDs(p, CL_DEVICE_TYPE_ALL, 1, &d, NULL);\n\n    cl_context ctx = clCreateContext(NULL, 1, &d,\n                                     NULL, NULL, NULL);\n    cl_command_queue q =\n        clCreateCommandQueue(ctx, d, 0, NULL);\n    cl_program prog = clCreateProgramWithSource(\n        ctx, 1, &src, NULL, NULL, NULL);\n\n    clBuildProgram(prog, 1, &d, NULL, NULL, NULL);\n    cl_kernel k = clCreateKernel(prog, \"calc\", NULL);\n\n    cl_mem a = clCreateBuffer(ctx, CL_MEM_READ_ONLY |\n        CL_MEM_COPY_HOST_PTR, sizeof(A), A, NULL);\n    cl_mem t = clCreateBuffer(ctx, CL_MEM_WRITE_ONLY,\n        sizeof(T), NULL, NULL);\n\n    clSetKernelArg(k, 0, sizeof(a), &a);\n    clSetKernelArg(k, 1, sizeof(t), &t);\n\n    size_t n = 4;\n    clEnqueueNDRangeKernel(q, k, 1, NULL, &n,\n                           NULL, 0, NULL, NULL);\n    clFinish(q);\n    clEnqueueReadBuffer(q, t, CL_TRUE, 0, sizeof(T),\n                        T, 0, NULL, NULL);\n\n    printf(\"Transpose:\\n%d %d\\n%d %d\\n\",\n           T[0], T[1], T[2], T[3]);\n    printf(\"Trace: %d\\n\", A[0] + A[3]);\n\n    return 0;\n}"
 },
 {
  "w": 14,
  "t": "Calculating the Value of Pi (π) Using OpenCL",
  "c": "#include <stdio.h>\n#include <CL/cl.h>\n\nconst char *src =\n\"__kernel void calc(__global float *sum) {\"\n\"int i = get_global_id(0);\"\n\"float x = (i + 0.5f) / 100000.0f;\"\n\"sum[i] = 4.0f / (1.0f + x*x);\"\n\"}\";\n\nint main() {\n    const int N = 100000;\n    float *sum = malloc(N * sizeof(float));\n\n    cl_platform_id p;\n    cl_device_id d;\n    clGetPlatformIDs(1, &p, NULL);\n    clGetDeviceIDs(p, CL_DEVICE_TYPE_ALL, 1, &d, NULL);\n\n    cl_context ctx = clCreateContext(NULL, 1, &d,\n                                     NULL, NULL, NULL);\n    cl_command_queue q =\n        clCreateCommandQueue(ctx, d, 0, NULL);\n    cl_program prog = clCreateProgramWithSource(\n        ctx, 1, &src, NULL, NULL, NULL);\n\n    clBuildProgram(prog, 1, &d, NULL, NULL, NULL);\n    cl_kernel k = clCreateKernel(prog, \"calc\", NULL);\n\n    cl_mem s = clCreateBuffer(ctx, CL_MEM_WRITE_ONLY,\n                              N * sizeof(float), NULL, NULL);\n    clSetKernelArg(k, 0, sizeof(s), &s);\n\n    size_t n = N;\n    clEnqueueNDRangeKernel(q, k, 1, NULL, &n,\n                           NULL, 0, NULL, NULL);\n    clFinish(q);\n    clEnqueueReadBuffer(q, s, CL_TRUE, 0,\n                        N * sizeof(float), sum,\n                        0, NULL, NULL);\n\n    double pi = 0;\n    for (int i = 0; i < N; i++)\n        pi += sum[i] / N;\n\n    printf(\"Approximate Pi = %.6f\\n\", pi);\n\n    return 0;\n}"
 }
];

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const raw = req.query.path || '';
  const p = ('/' + raw).replace(/\/+$/, '').toLowerCase();

 if (p === '/list') {
  res.statusCode = 200;
  return res.end(D.map(x => 'week' + x.w + ' - ' + x.t).join('\n') + '\n');
}
 

 const m = p.match(/^\/week\/?(\d+)$/);
  const x = m && D.find(e => e.w === +m[1]);

  if (x) {
    res.statusCode = 200;
    return res.end(x.c + '\\n');
  }

  res.statusCode = 404;
  return res.end('not found\\n');
};
