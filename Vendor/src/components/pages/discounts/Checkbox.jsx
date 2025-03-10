import React from "react";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolverRef = ref || defaultRef;

  React.useEffect(() => {
    resolverRef.current.indeterminate = indeterminate;
  }, [resolverRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolverRef} {...rest} />
    </>
  );
});
