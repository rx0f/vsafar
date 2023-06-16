interface IClientContainterProps  {
    children:React.ReactNode,
    LayoutBackground? : string,
    Custumize?:string,
    //override
    LayoutBackgroundOverRide?:string
    CustumizeOverRide?:string

}
function ClientContainter({children  , LayoutBackground="" , Custumize="",LayoutBackgroundOverRide ,CustumizeOverRide }:IClientContainterProps) {
    const Custum = CustumizeOverRide
                  ? CustumizeOverRide
                  :  `w-[86%] px-3 mx-3 lg:mx-0 sm:px-0 max-w-[1500px] ${Custumize} `
                  // : `w-full px-3 mx-3 lg:mx-0 sm:px-0 max-w-[700px] lg:max-w-[764px] xl:max-w-[1170px] 3xl:max-w-[1500px] ${Custumize} `

    const RootContainer = LayoutBackgroundOverRide
                        ? LayoutBackgroundOverRide
                        :`p-relative ${LayoutBackground}`



    return (
        <div className={RootContainer}>
        <div className={`flex justify-center`}>
          <div className={Custum}>
            {children}
          </div>
        </div>
      </div>
    );
}

export default ClientContainter;

