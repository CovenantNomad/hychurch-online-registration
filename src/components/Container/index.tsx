const Container = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="w-full md:max-w-[780px] lg:max-w-[1280px] mx-auto px-4 md:px-[15px] lg:px-[15px] pb-[30px] md:pb-[50px] lg:pb-[100px]">
      {children}
    </div>
  );
};

export default Container;
