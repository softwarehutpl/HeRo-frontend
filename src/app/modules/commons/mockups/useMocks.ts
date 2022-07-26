export function useMocks(enabled: boolean, module: any) {
  return function (
    target: unknown,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    if (enabled) {
      console.log('Decorator enabled - data is using Mock-ups.', target);
      descriptor.value = async () => {
        const data = (await module).default;
        // console.log('data from mock', data);
        return data;
      };
    }
    /* descriptor - i think this contains function that we docoraded */
  };
}
