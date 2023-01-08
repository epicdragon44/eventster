import React, { useEffect } from "react";

/**
 * Utility function to assert the target is a node
 * Lifted straight from https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
 */
function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
        throw new Error(`Node expected`);
    }
}

/**
 * Hook that alerts clicks outside of the passed ref
 * Modified from https://stackoverflow.com/a/42234988/11760521
 * 
 * Use like this:
 * ```
 *  const notifyClickOutside = useRef<HTMLDivElement>(null);
    useOutsideAlerter(notifyClickOutside, () => {
        // DO SOMETHING
    });
	return (
		<Body ref={notifyClickOutside}>
            ...
        </Body>
    )
 * ```
 */
export function useOutsideAlerter(
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside({ target }: MouseEvent) {
            assertIsNode(target);
            if (ref.current && !ref.current.contains(target)) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
