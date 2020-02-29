public class ComplexNumber {
    double re;
    double im;

    double amp;
    double phase;

    public ComplexNumber(double real, double im)    {
        this.re = real;
        this.im = im;

        this.amp = Math.sqrt(Math.pow(real, 2) + Math.pow(im, 2));
        this.phase = Math.atan2(im, real);
    }

    public ComplexNumber(double amp, double phase, double re, double im)  {
        this.re = amp * Math.cos(phase);
        this.im = amp * Math.sin(phase);

        this.amp = amp;
        this.phase = phase;
    }

    public void setReal(double real)    {
        this.re = real;
    }

    public void setImaginary(double im) {
        this.im = im;
    }

    public static ComplexNumber multiply(ComplexNumber a, ComplexNumber b)  {
        double real = a.re * b.re - a.im * b.im;
        double im = a.re * b.im + a.im * b.re;
        return new ComplexNumber(real, im);
    }

    public static ComplexNumber add(ComplexNumber a, ComplexNumber b)   {
        double real = a.re + b.re;
        double im = a.im + b.im;
        return new ComplexNumber(real, im);
    }

    public static ComplexNumber sub(ComplexNumber a, ComplexNumber b)   {
        double real = a.re - b.re;
        double im = a.im - b.im;
        return new ComplexNumber(real, im);
    }

    public static ComplexNumber polar(double amp, double phase) {
        return new ComplexNumber(amp, phase, 0, 0);
    }

    @Override
    public String toString() {
        return "ComplexNumber{" +
                "re=" + re +
                ", im=" + im +
                ", amp=" + amp +
                ", phase=" + phase +
                "}\n";
    }
}
