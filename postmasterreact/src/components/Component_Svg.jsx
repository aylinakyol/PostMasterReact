import { svgList } from "../variables/Private_Items";
import { useState } from "react";

export default function SvgIcon({ svgId }) {
    const svg = svgList.find((svg) => svg.key === svgId);

    if (!svg) return null;

    return (
        <svg
            viewBox={svg.viewBox}
            data-icon={svg.name}
            width="24"
            height="24"
            style={{ marginRight: "8px" }}
            dangerouslySetInnerHTML={{ __html: svg.value }}
        />
    );
}
