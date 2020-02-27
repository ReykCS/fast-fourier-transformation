function dft(signal)  {
    let newValues = new Array(signal.length);
    let omega = 2 * Math.PI / signal.length;

    for ( let i = 0; i < signal.length; i++)    {
        let reGes = 0;
        let imGes = 0;signal
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
        // if ( i > 0 ) newValues[values.length - i] = sum;
        // if ( sum > maxValue ) maxValue = sum;
    }

    return newValues;
}

function fft(signal)    {
    return fftAlg(signal.map((a) => math.complex(a, 0)));
}

function fftAlg(signal)    {
    let N = signal.length;
    if ( N <= 1 ) return signal;
    let M = Math.floor(N / 2);

    let even = new Array(M);
    let odd = new Array(M);

    // TODO -> übergebe fft startindex und jumpsize
    for ( let i = 0; i < M; i++)    {
        even[i] = signal[2 * i];
        odd[i] = signal[2 * i + 1];
    }

    let Feven = fftAlg(even);
    let Fodd = fftAlg(odd);

    let bins = new Array(N);
    for ( let k = 0; k < M; k++)  {
        let angle = - (2 * Math.PI * k / N);
        let complexExponential = math.complex({r: 1, phi: angle});
        complexExponential = math.multiply(complexExponential, Fodd[k]);

        bins[k] = Feven[k];
        bins[k] = math.add(bins[k], complexExponential);

        bins[k + N/2] = Feven[k];
        bins[k + N/2] = math.add(bins[k + N/2], math.complex({re: - complexExponential.re, im: - complexExponential.im}));
    }
    return bins;
}

function testFourier(num)  {
    console.log("Test runtime of DFT against FFT");
    num = num || 128;
    let testArr = new Array(num);
    for ( let i = 0; i < num; i++)  {
        testArr[i] = Math.floor(Math.random() * 100);
    }
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