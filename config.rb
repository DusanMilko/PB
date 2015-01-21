# Require any additional compass plugins here.
require "sass-globbing"
require "breakpoint"

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "assets/css"
sass_dir = "scss"
images_dir = "assets/imgs"
javascripts_dir = "assets/js"
sprite_load_path = "assets/imgs"
#generated_images_dir = "/"
http_generated_images_path = "../imgs/"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Trigger blessc after compilation
# on_stylesheet_saved do |filename|
#     exec('blessc ' + css_dir + '/' + File.basename(filename) + ' -f')
# end
