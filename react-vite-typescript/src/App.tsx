// import RenderList01 from "./components/Day4/props/renderList01/renderList01.tsx";
// import RenderList04 from "./components/Day4/props/renderList04/renderList04.tsx";
// import State1 from "./components/Day4/state/state1/state1.tsx";
// import State2 from "./components/Day4/state/state2/state2.tsx";
// import LikeButton from "./components/Day4/homework/likeButton/likeButton.tsx";
// import SlidewThumbs from "./components/Day4/homework/slidewThumbs/slidewThumbs.tsx";
// import ButtonTabs from "./components/Day4/homework/buttonTabs/buttonTabs.tsx";
// import ButtonAccordtion from "./components/Day4/homework/buttonAccordtion/buttonAccordtion";
// import ClickedCounter from "./components/Day5/Exercises/Ex1-ClickedCounter/clickedCounter.tsx";
// import InputTracker from "./components/Day5/Exercises/Ex2-InputTracker/inputTracker.tsx";
// import ToggleSwitch from "./components/Day5/Exercises/Ex3-ToggleSwitch/ToggleSwitch.tsx";
// import HoverHighlight from "./components/Day5/Exercises/Ex4-HoverHighlight/HoverHighlight.tsx";
// import FormSubmissionAlert from "./components/Day5/Exercises/Ex5-FormSubmissionAlert/FormSubmissionAlert.tsx";
// import KeyPressDisplay from "./components/Day5/Exercises/Ex6-KeyPressDisplay/KeyPressDisplay.tsx";
// import DoubleClickMessage from "./components/Day5/Exercises/Ex7-DoubleClickMessage/DoubleClickMessage.tsx";
// import DropdownSelection from "./components/Day5/Exercises/Ex8-DropdownSelection/DropdownSelection.tsx";
// import CheckboxToggle from "./components/Day5/Exercises/Ex9-CheckboxToggle/CheckboxToggle.tsx";
// import SearchFilter from "./components/Day5/Exercises/Ex10-SearchFilter/SearchFilter.tsx";
// import Calculator from "./components/Day5/homework/Calculator/Calculator.tsx";
// import RegistrationForm from "./components/Day5/homework/RegistrationForm/RegistrationForm.tsx";
// import { ShoppingCart } from "./components/Day5/homework/ShoppingCart/index.tsx";
// import Products from "./components/Day6/afternoon-work-CRUD/index.tsx";
// import WeatherApp from "./components/Day6/homework/index";
// const RenderList01Data = [
//   {
//     id: 1,
//     image:
//       "https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/an-tuong-dau-tien-samsung-galaxy-a32-4g-voi-hon-6-trieu-da-co-man-hinh-super-amoled-90hz-sthumb-1615348455.jpg",
//     label:
//       "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
//     subLabel: "140 lượt xem",
//   },
//   {
//     id: 2,
//     image:
//       "https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/an-tuong-dau-tien-samsung-galaxy-a32-4g-voi-hon-6-trieu-da-co-man-hinh-super-amoled-90hz-sthumb-1615348455.jpg",
//     label:
//       "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
//     subLabel: "140 lượt xem",
//   },

//   {
//     id: 3,
//     image:
//       "https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/an-tuong-dau-tien-samsung-galaxy-a32-4g-voi-hon-6-trieu-da-co-man-hinh-super-amoled-90hz-sthumb-1615348455.jpg",
//     label:
//       "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
//     subLabel: "140 lượt xem",
//   },

//   {
//     id: 4,
//     image:
//       "https://ecshopvietnam.com/ecshopstore/cdn/article_thumb/202103/an-tuong-dau-tien-samsung-galaxy-a32-4g-voi-hon-6-trieu-da-co-man-hinh-super-amoled-90hz-sthumb-1615348455.jpg",
//     label:
//       "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
//     subLabel: "140 lượt xem",
//   },
// ];

// const RenderList04Data = [
//   {
//     id: 1,
//     image:
//       "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/type-c-20-w.png?raw=true",
//     name: "Adapter Type C 20W",
//     price: "1.290.000",
//     oldPrice: "790.000",
//     discount: "20%",
//     discountStatus: true,
//   },
//   {
//     id: 2,
//     image:
//       "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/type-c-20-w.png?raw=true",
//     name: "Adapter Type C 20W",
//     price: "1.290.000",
//     oldPrice: "790.000",
//     discount: "20%",
//     discountStatus: false,
//   },
//   {
//     id: 3,
//     image:
//       "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/type-c-20-w.png?raw=true",
//     name: "Adapter Type C 20W",
//     price: "1.290.000",
//     oldPrice: "790.000",
//     discount: "20%",
//     discountStatus: false,
//   },
//   {
//     id: 4,
//     image:
//       "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/type-c-20-w.png?raw=true",
//     name: "Adapter Type C 20W",
//     price: "1.290.000",
//     oldPrice: "790.000",
//     discount: "20%",
//     discountStatus: true,
//   },
// ];

// const stateButton1 = [
//   { id: 1, label: "Đen" },
//   { id: 2, label: "Hồng" },
//   { id: 3, label: "Xanh" },
// ];

// const slideData = [
//   { id: 1, imgsrc: "/images/meme1.png" },
//   { id: 2, imgsrc: "/images/meme2.jpg" },
//   { id: 3, imgsrc: "/images/meme1.png" },
//   { id: 4, imgsrc: "/images/meme2.jpg" },
//   { id: 5, imgsrc: "/images/meme1.png" },
//   { id: 6, imgsrc: "/images/meme2.jpg" },
// ];

// const buttonTabsData = [
//   {
//     id: 0,
//     label: "History",
//     content:
//       "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
//   },
//   {
//     id: 1,
//     label: "Approach",
//     content:
//       "Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
//   },
//   {
//     id: 2,
//     label: "Culture",
//     content:
//       "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.",
//   },
//   {
//     id: 3,
//     label: "Method",
//     content:
//       "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
//   },
// ];

function App() {
  return (
    <>
      {/*<WeatherApp />
      <Products />

       <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
            width: "100%",
          }}
        >
          <span
            style={{ fontSize: "24px", fontWeight: "bold", marginLeft: "20px" }}
          >
            TIN MỚI
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "normal",
              marginRight: "60px",
            }}
          >
            Xem thêm
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {RenderList01Data.map((item) => (
            <RenderList01
              key={item.id}
              image={item.image}
              label={item.label}
              subLabel={item.subLabel}
            />
          ))}
        </div>
      </div>

      <div>
        {RenderList04Data.map((item) => (
          <RenderList04
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
            discount={item.discount}
            discountStatus={item.discountStatus}
          />
        ))}
      </div>
      <State1 data={stateButton1} />
      <State2 />

      
      <div style={{ margin: "20px" }}>Homework Day 4</div>

      <LikeButton status={false} />

      <SlidewThumbs data={slideData} />

      <ButtonTabs data={buttonTabsData} />

      <ButtonAccordtion data={buttonTabsData} /> 
      

      <ClickedCounter />

      <InputTracker />

      <ToggleSwitch />

      <HoverHighlight />

      <FormSubmissionAlert />

      <KeyPressDisplay />

      <DoubleClickMessage />

      <DropdownSelection />

      <CheckboxToggle />

      <SearchFilter />

      <div style={{ margin: "40px" }}>Homework Day 5</div>

      <Calculator />

      <RegistrationForm />

      <ShoppingCart />
      */}
    </>
  );
}

export default App;
