# Compatibility shim for local Jekyll 3.9 + Liquid 4.0.3 on Ruby 3.2+.
# String#tainted? was removed in Ruby 3.2; Liquid 4.0.3 still calls it.
# This file is only used for local `jekyll build` — GitHub Pages uses its own runtime.
unless String.method_defined?(:tainted?)
  class String
    def tainted?
      false
    end
  end
  class Object
    def tainted?
      false
    end
  end
end
