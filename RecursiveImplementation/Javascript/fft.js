function dft(signal)  {
    let newValues = new Array(signal.length);
    let omega = 2 * Math.PI / signal.length;

    for ( let i = 0; i < signal.length; i++)    {
        let reGes = 0;
        let imGes = 0;
        for ( let j = 0; j < signal.length; j++)    {
            let rad = signal[j];
            let phi = - (i * j * omega); 
            let re = rad * Math.cos(phi);
            let im = rad * Math.sin(phi);
            
            reGes += re;
            imGes += im;
        }
        let amp = Math.sqrt(reGes * reGes + imGes * imGes);
        let phase = Math.atan2(imGes, reGes);
        newValues[i] = {amp, phase, reGes, imGes};
    }

    return newValues;
}

function fft(signal)    {
    return fftAlg(signal.map((a) => math.complex(a, 0)), 0, 1);
}

function fftAlg(signal, startIndex, stepSize)    {
    let N = Math.floor(signal.length / stepSize);
    if ( startIndex + stepSize >= signal.length ) {
        return [signal[startIndex]];
    }
    let M = Math.floor(N / 2);

    let Feven = fftAlg(signal, startIndex, stepSize * 2);
    let Fodd = fftAlg(signal, startIndex + stepSize, stepSize * 2);

    let bins = new Array(N);

    for ( let k = 0; k < M; k++)  {
        let angle = - (2 * Math.PI * k / N);
        let complexExponential = math.complex({r: 1, phi: angle});
        complexExponential = math.multiply(complexExponential, Fodd[k]);

        bins[k] = Feven[k];
        bins[k] = math.add(bins[k], complexExponential);

        bins[k + M] = Feven[k];
        bins[k +M] = math.add(bins[k + M], math.complex({re: - complexExponential.re, im: - complexExponential.im}));
    }
    return bins;
}

function testFourier(num)  {
    console.log("Test runtime of DFT against FFT");
    num = num || 128;
    let testArr = createRandomArray(num);
    console.time("DFT");
    let d = dft(testArr);
    console.timeEnd("DFT");
    console.log(d);
    console.log(testArr);
    console.time("FFT");
    let f = fft(testArr);
    console.timeEnd("FFT");
    console.log(f);
}

function createRandomArray(num) {
    return (new Array(num).fill(0)).map((a) => Math.floor(Math.random() * 100));
}

function runtimeTestFourier(tests)   {
    tests = tests || 13;
    const debug = false;
    for ( let i = 0; i < tests; i++)   {
        let samples = Math.pow(2, i);
        let testArr = createRandomArray(samples);
        
        let dftTime = test(dft, testArr, "DFT", debug);
        let fftTime = test(fft, testArr, "FFT", debug);

        let faster = dftTime > fftTime ? "FFT" : "DFT";
        console.log("Test with arraySize = " + samples + "\n==> " + faster);
    }
}

function test(method, testCase, name, debug)   {
    
    let startDft = window.performance.now();
    method(testCase);
    let endDft = window.performance.now();
    let diffDft = endDft - startDft;
    if ( ! debug ) return diffDft;
    console.log(name);
    console.log(diffDft + " ms");
    return diffDft;
}