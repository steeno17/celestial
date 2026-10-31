cmake_minimum_required(VERSION 4.3)
project(celestial_website)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# compiler tags based on the operating system 
# ( only support for windows and linux/openbsd ) 
if(MSVC)
  add_compile_options(/W4 /WX)
else()
  add_compile_options(-Wall -Wextra -Werror -Wno-extra)
endif()

file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS js_test_field/src/*.cpp js_test_field/src/*.hpp)

find_package(fmt REQUIRED)

# letting vcpkg handle fetching the nlohmann_json source repository 
# find_package(nlohmann_json CONFIG REQUIRED)

add_executable(celestial_website
  js_test_field/src/sky.cpp
  js_test_field/src/render14magnitude.cpp
)


set(JSON_BuildTests OFF CACHE INTERNAL "")
set(JSON_Install OFF CACHE INTERNAL "")


# this will manually fetch and install the source code of nlohmann_json cpp
# include(FetchContent)
#
# FetchContent_Declare(
#     json
#     URL https://github.com/nlohmann/json/releases/download/v3.12.0/json.tar.xz
# )
#
# FetchContent_MakeAvailable(json)

target_link_libraries(celestial_website PRIVATE
  fmt::fmt
)

target_include_directories(celestial_website PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}js_test_field/src
  ${CMAKE_CURRENT_SOURCE_DIR}/vendors
)
