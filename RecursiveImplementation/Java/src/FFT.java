import java.util.Arrays;

public class FFT {

    public static ComplexNumber[] dft(int[] arr) {
        ComplexNumber[] output = new ComplexNumber[arr.length];
        double omega = 2 * Math.PI / arr.length;

        for ( int k = 0; k < arr.length; k++)   {
            double real = 0;
            double im = 0;
            for ( int n = 0; n < arr.length; n++)   {
                double angle = - k * n * omega;
                real += arr[n] * Math.cos(angle);
                im += arr[n] * Math.sin(angle);
            }
            output[k] = new ComplexNumber(real, im);
        }
        return output;
    }

    public static ComplexNumber[] fft(int[] arr)    {
        ComplexNumber[] signal = new ComplexNumber[arr.length];
        for ( int i = 0; i < arr.length; i++ )   {
            signal[i] = new ComplexNumber(arr[i], 0);
        }
        return fftRecursive(signal, 0, 1);
    }

    public static ComplexNumber[] fftRecursive(ComplexNumber[] signal, int startIndex, int stepSize)    {
        int N = signal.length / stepSize;
        if ( startIndex + stepSize >= signal.length ) return new ComplexNumber[]{signal[startIndex]};

        int M = N / 2;
        ComplexNumber[] Feven = fftRecursive(signal, startIndex, stepSize * 2);
        ComplexNumber[] Fodd = fftRecursive(signal, startIndex + stepSize, stepSize * 2);

        ComplexNumber[] frequencyBins = new ComplexNumber[N];

        for ( int k = 0; k < M; k++)    {
            double angle = - (2 * Math.PI * k / N);
            ComplexNumber exponential = ComplexNumber.polar(1, angle);
            exponential = ComplexNumber.multiply(exponential, Fodd[k]);

            frequencyBins[k] = ComplexNumber.add(exponential, Feven[k]);
            frequencyBins[k + M] = ComplexNumber.sub(Feven[k], exponential);
        }

        return frequencyBins;
    }

    public static int[] createRandomArray(int size)  {
        int[] newArr = new int[size];
        for ( int i = 0; i < size; i++) {
            newArr[i] = (int) Math.floor(Math.random() * 100);
        }
        return newArr;
    }

    public static void main(String[] args) {
        // FFT Only works with 2 exponentials

        int[] testArray = FFT.createRandomArray(64);
        ComplexNumber[] dft = FFT.dft(testArray);
        ComplexNumber[] fft = FFT.fft(testArray);
        System.out.println(Arrays.toString(dft));
        System.out.println(Arrays.toString(fft));
    }
}
