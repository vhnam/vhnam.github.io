import sharpService from "astro/assets/services/sharp";
import { isESMImportedImage } from "astro/assets/utils";
import type { ImageOutputFormat, LocalImageService } from "astro";
import type { SharpImageServiceConfig } from "astro/assets/services/sharp";

type ImageServiceConfig = SharpImageServiceConfig & {
  /** Default output format when `format` is not set on Image/getImage. Defaults to `"avif"`. */
  defaultFormat?: ImageOutputFormat;
};

const service: LocalImageService<ImageServiceConfig> = {
  ...sharpService,
  validateOptions(options, imageConfig) {
    const hadExplicitFormat = options.format != null;
    const validated = sharpService.validateOptions(options, imageConfig);

    if (hadExplicitFormat || validated.format === "svg") {
      return validated;
    }

    const defaultFormat =
      imageConfig.service.config?.defaultFormat ?? "avif";

    if (isESMImportedImage(validated.src) && validated.src.format === "gif") {
      // Sharp cannot encode animated GIF as AVIF; keep Astro's webp default for GIFs.
      return validated;
    }

    validated.format = defaultFormat;
    return validated;
  },
};

export default service;
