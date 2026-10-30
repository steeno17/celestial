extern "C" {
void project_stars(
    const double* ra,
    const double* dec,
    double* x,
    double* y,
    int count,
    double width, // canvas width and height ( passed in from JS )
    double height) {
    // converts the json data of Ra's, Dec's into a buffer of xy co ordinates ( emscripten naming convention calls _project_stars(...) )
    for (int i = 0; i < count; ++i) {
        x[i] = (ra[i] / 360.0) * width;
        y[i] = ((90.0 - dec[i]) / 180.0) * height;
    }
}
}
