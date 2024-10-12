import { useAppContext } from "@/hooks/useAppContext";
import { TAB } from "@/context/appContext";

import { DecorationTools } from "@/components/tools-rows/decoration-tools";
import { SlideshowTools } from "@/components/tools-rows/slideshow-tools";
import { AnimationTools } from "@/components/tools-rows/animation-tools";

import * as s from "./styled.module.scss";
import { memo } from "react";

function ToolsHeader() {
    const { activeTab } = useAppContext();

    return (
        <div className={s.root}>
            {activeTab === TAB.SLIDESHOW ? (
                <SlideshowTools />
            ) : activeTab === TAB.ANIMATION ? (
                <AnimationTools />
            ) : (
                <DecorationTools />
            )}
        </div>
    );
}

export default memo(ToolsHeader);