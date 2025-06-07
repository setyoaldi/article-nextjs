import { Footer } from "@/types/global";

function FooterComponent({
  style,
  title,
  wraperProfileStyle,
  imgStyle,
  wrapperTitleStyle,
  profileText,
  titleStyle,
  logoUrl,
  logoStyle,
}: Footer) {
  return (
    <>
      <footer className={`${style}`}>
        <div className={`title ${wrapperTitleStyle}`}>
          {title && <h2 className={`title ${titleStyle}`}>{title}</h2>}
          {logoUrl && (
            <img
              className={`${logoStyle}`}
              src={logoUrl}
              alt="this logo of footer"
            />
          )}
        </div>
        <div className={`${wraperProfileStyle} profile`}>
          <div className={`${imgStyle}`}>
            <p>{profileText}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default FooterComponent;
