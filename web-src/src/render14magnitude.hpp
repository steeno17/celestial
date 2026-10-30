#pragma once

#include <iostream>
#include <vector>

namespace Mag14 {
    struct Renderer {
        Renderer() = default;
        ~Renderer() = default;

        void render6_mag();
        void render8_mag();
        void render14_mag();

    private:
    };

}