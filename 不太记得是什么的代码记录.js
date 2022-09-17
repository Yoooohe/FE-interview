// const fetchRef = useRef(0);

//   // const debounceFetcher = useMemo(() => {
//   //   const loadOptions = (shopId: string) => {
//   //     fetchRef.current += 1;
//   //     const fetchId = fetchRef.current;
//   //     setOptions([]);
//   //     setIsLoading(true);
//   //     getShopOption(shopId).then((newOptions) => {
//   //       if (fetchId !== fetchRef.current) {
//   //         // for fetch callback order
//   //         return;
//   //       }
//   //       newOptions && setOptions(newOptions);
//   //       setIsLoading(false);
//   //     });
//   //   };
//   //   return debounce(loadOptions, debounceTimeout);
//   // }, [getShopOption, debounceTimeout]);

// export const useDebounce = <T>(value: T, delay: number): T => {
//   // State and setters for debounced value
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);
//   useEffect(
//     () => {
//       // Update debounced value after delay
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);
//       // Cancel the timeout if value changes (also on delay change or unmount)
//       // This is how we prevent debounced value from updating if value is changed ...
//       // .. within the delay period. Timeout gets cleared and restarted.
//       return () => {
//         clearTimeout(handler);
//       };
//     },
//     [value, delay] // Only re-call effect if value or delay changes
//   );
//   return debouncedValue;
// };

// export const decamelizeThatDontBreaksFile = (object: any): any => {
//   if (object && !(object instanceof File)) {
//     if (object instanceof Array) {
//       return object.map((item) => decamelizeThatDontBreaksFile(item));
//     }
//     if (object instanceof FormData) {
//       let formData = new FormData();
//       for (const [key, value] of object.entries()) {
//         formData.append(decamelize(key), value);
//       }
//       return formData;
//     }
//     if (typeof object === "object") {
//       return Object.keys(object).reduce(
//         (acc, next) => ({
//           ...acc,
//           [decamelize(next)]: decamelizeThatDontBreaksFile(object[next]),
//         }),
//         {}
//       );
//     }
//   }
//   return object;
// };
