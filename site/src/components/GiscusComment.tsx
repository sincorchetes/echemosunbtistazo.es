import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function GiscusComment(): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="sincorchetes/echemosunbtistazo.es"
      repoId="R_kgDOR__Plw"
      category="Blog Comments"
      categoryId="DIC_kwDOR__Pl84C6n6Z"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={colorMode}
      lang="es"
      loading="lazy"
    />
  );
}
