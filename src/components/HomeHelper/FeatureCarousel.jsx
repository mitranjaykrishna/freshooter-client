import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeatureCarousel({ heading, data }) {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/product/${link}`);
  };

  return (
    <div className="w-full border border-quaternary p-4 sm:p-6 rounded-lg relative">
      <span className="text-lg sm:text-2xl font-semibold text-center block mb-4">
        {heading}
      </span>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleNavigate(item.link)}
              className="group p-3 bg-white shadow-md rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border hover:border-primary cursor-pointer hover:bg-gradient-to-r from-tertiary to-primary h-full"
            >
              {/* Image with Zoom on Hover */}
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <img
                  src={item.image || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAyAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAD4QAAIBAwIDBgIKAQIEBwAAAAECAwAEERIhBTFBBhMiUWFxgZEUIzJCUqGxwdHw4WJyFSQzNBZEY4KTsvH/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMEAAX/xAAiEQACAgMBAAMAAwEAAAAAAAAAAQIRAxIhMQRBURMiYcH/2gAMAwEAAhEDEQA/AN9BZxoxJXPvRCDcDlp3qUIuc7k09Y8ajjYnArHRpsCkTMgO/Op0QnfHKnNH4t6mCYGdsda4LGwbu5PJcKP1p+k6iRXIPBHlvvEkU/vAOn511CiiBLnI+6KZNB3rR4AGltWetSx7fWHGjGCQamVVO4IxRoF0RjAHl6U04PPrtRenblQ1+/cQ5GMnYUX/AFVs5O2QQnXCjAdKk30kAYNDWd73sCtgEMSNhjG9FLKDkIM4OD6VOE1MZqiBUZhg7Y5Vzut/I+dFk7GmDB3zinoFkQQZ2OSK6EVtskn8KrmnSShSIyNIbxK5G2eufnQc0dvcALM08gHMBiqt7gYFPoqti7O+HJrm2tGZp54YlJyRLMiY8+tV57Q8DU6W4rYDJ2/5kfxVhDw3hw3SwtlON/qxv+VELaQMCpt4f/jFdUfw65fpUDjfDZZQsHFbLPLAuEyfgcZq4iKiMNK3hP2W07fMGgrvs9we6/7jhdo/XeID9KcOH2FrGtrAJoUVSV7tiFUDmBnIplGDBtIsVXSuQBjoRUqpnnUPDSNLRFmeMLlZMbNud/Q8tqlVzjBpXDUKdjzHp3HWlpFdDZ51wnn6UAnD4a7TGfApUTgDVpUsfKnAsFUBhsN88qQCsyqACB4jTyPDjBxSBIXlw25zT2uQq78sZrkqDIGTTXTwgA8yKBxI9wrxwmXAkxpYICQPl7Z386cpj5tpHuMUKSJL5+WgIDy5HcUWipjAUbU4p1XjZNKqc/iCkfntRFujNHlVG5P3v8VFGq6BmMA+gqUHqOlFAY5JQ5wjciQQeYIoLibF5Y0B2Ayc+p/walQfWOynZgpP9+FDSSF7t+7Ks64yM8h5/IUsuoK50UYUNhQBjcj3rljKDPIvRicfCpPCqSyc8E7457f/ALQEDaJUYbZNShGpuhr4XJ3qExuG23FdL4UZOPems3IE1Y4ljLMml0B9OmKhljijdQSqFicb4+VSQnDrnzpzglkwASM9M08eonLjIdK5+0PnUoTbwuPka62cZKx/pTe7jboM0ySBZxm0NpkZQOnPNdCxs2Q6uyjbSeXnnrUsdqmM4Bx5AE/nSQFpe6IZd8hWAGTRUQWIAJGscMZ2XAA6D1qFCY20Nn0Dcx6U6ZnhzJHjXglAfMcs+lDxeO3tptbvrRWy/PcZAoS6FcDQdvDXNJGd6amrpTgakUODl60q423KlROK2OTSTkHHLINSJKzEs4VR0HOoLdWESlxudyPeicaVyVAqYSOWZml0opGMZbzrqws4XU7bb7UQ0apI6E5cDdUXOKSLy1K4H+4CmSFbIuGcPm76dpuTyeAZ2CAYH99atlikRgAiAeYFcgbusD7p6MabLfBN9AqvEuidYXp8PiRflQt0qpCzRjxD7vmagju5rqTTGAiA4LgZ+VFkdzGcynGcszUuyqw6tAA8CPnPhUA/KqyBzE808rDSW/DuABv71bycQtN2N3E8Z5ADOaAvLqwAAeLUc5wNhUJZ4L7KaSfiOXBUW5Oo6XIIA2oTB2xyFSyXaXC5EZABFR7nfkK7FJSTaDJVws5AZYVx133ND4Mcg1H45Jp9u+qNQDy2rsuCfWnAPBBkX3o1YCzHGo58sUFb4a4U423NGd+YxgjUPfFWh4Sn6TLF3Y0rESPPanZP4XPstCm+hX7ZcfnTW4rbLznx/wC00/BA4H/02+OBUTR944z4SPvAH9aCbjdmD/1mJ9FqFuLowxEpz0LHNdaCFs6m6AxsSMZNBcLBPBrHXzEMefcLT4i0ro+RkEV2xweF2xXGBGvL2pLHJ1IJNOGk+tDq+9PVtz61MoTMFKnApVGWwKVcAC0lIsnGAMnFRJcg2qznOknl1p8quIWVfwaTTUt+8vEiVMQRAD0J/v71Kbpc9Cya1LywYbJA+8ck/H+amjgEMJcqG1dZHz8sZNGYjgT8O25HSs1fT3E933NtOQMk4zgH5V2Wf8MVKXRIrbwuBIrMuqUIDtgbVGhWRmJdWCnA8j1rOyO8blXJDKd9+VSGWU8NLwai/enJU78sV5+T5/qSNEMX+lvxni8tl3MMUirJJsSFFZocUuL2OU3DuAWZQSScUFxDVI0MjykBWwQdyd6G4g+vSA32W8Sr02/LnWKWaWWXvDdDFGC/0IF1JFNaQW+kxknvWJ5VsYuEDC965djyCnArza0YiZNedhXqfZi/N1ZIkmzAYDDrXofBx45SakiHy3KMU4jhwkRqQuRkjbVk1P8A8ORUBMAZuviJo8yqBjUDj1rokUgnUT54OPlXsRxwiqSPNc5P1gMdgkMZwhyTk4cmmyQJ3Tvgrg7Zo2a7W3AEhLOeSDniq65uHnU5Ow5KOX+aWbgkGNsVmvikffAAFOnNOsgPooP4jvUc1GC4CXpXXTYzis7fzsud6v7vkazfEBzoS8OiQW857wb1eWjnzrPW6/WCtBZ8hU0h34X9mfCDkjGDRNrGYrIIxB0oq5AwDyoOwwVwc7jFHu4AKqcqQNzsc04EQAY6V0LjrXFJJIxuKcnTPWkKHGx944pUmA2yM+9KuOBwfskk4HMVKbhYmQheWTihhnXhc+9QT3AhLaweW1Sk6Vo7WznFbyS4wIyQoG/vVVbpMjNLGrBzspI8+tW/DZ7eZCwIY55+VMv+JJAMAgZNZMsP5VtJjR46SGXUcNyYreIkyLscnp61IwteHW5jUDU4+L9M/OqG84oEuhcwuqaUxIWOOtBy9pobuO1hgctNcBU0aDkuWOB+lY+pSlFW/wDheELfSTjEMYmfu5NQDDccj51VW3CpeL3stvZ4SWQrJJI+dK423q/XhIlGq/uQ5HKOJhp59T/FXXD7SLh6x28SKu4Zioxv/ipYcVStmmWSlSMB2qto+zVxE0k3eQyEhDpwxYcxge4xWn7DcUW+4YJUBGlz4DsQafxu2sbxpYOI2xuItXhVW0kMdv3rNcGgk7JcZe1kbNrckaJAMDUDgE+vIH4V6PxnBO16Qy7SjTPWxcLJFjTklcgnzoW8vltPAgDXBGynknqahs7graB9S/ZyPQ1VZYuxzksclvOvTlk5RgUOhqSM+WJJJ5knc1NkaSARtmgVmCjO43wPPPpWZm4y/H+MQcL4cxFmsyC4mU/bAOSoI6evX2qBRRbPQY17uBF8hQ05otjkeXp5UHOOdalxECtuuRrP3wzmtBddapbpdzSyGiCWsWTnFXdqvhA8qAtkAwaubKAsucHTnbA50qVlKCrVgGAyR7CjnzpyrH3IBH6UHGI13eQIg5tUn0mBiRC7k8hqGBT6WAcWlBGVRsnBKtg/nUh1AjGDkeddwc7KCvUBgCKSZK6kyUJ6jFLqwnM7Y5mlTA3XB50qQILE2ksTpG2az/GL1isxhbxquARWijsp5Q2EEYJ2L7VFF2at2y167SluaIdK/wA/mKjKLaKRlFPpjLLi10kgkmt2LkBT3C5D+unnmr9uEX19bazE0QbxBJBhht5fsa1NraQWiaLWFIlxyVcVOBSRw8piyyd4jxfizP38lqyGHuiRplyjMfMg77/31E4dGbDi9vf3ETyCDUQq8gdJAO/kTn4V7FxngfD+NQCK/gDaR4JF8Lp7N/RXm/HexvFuCl7iyme7tR95AdSjrqUfqPypZY9VSNOPJGXGN7PXMl5xCW+vY+6sLRde7Z1yH7K/Dcn2oi67eQrxC3t7RY2kkuEjJZtRGWA6e9Zv6bJLCYJou8jJyRzDddx570bwXhlvdSPcJbiOK2IdmRcMWz4VHTOxOfIGoQwRTpcRWVJNs2nFBGl7O7YOSAdR2GDn9f0qu4yttf8ADpYL4lI3JKzbJofoylsflnPKtTwOKW8sEF/Z6LjUyuJ4irMPPfcc6tOG2f8Aw7h0NjA0ssMMYjWSdgWPucb/AK1fH8VLtmOWd+GZ7Fz3FxwNYrmMyaDoM3JW9RRU69yrEqzIo5qRV/JcJDKO8nhRyBtnfAoNrq2vJu671XhK4YE8/MEH4VqaS9I227PO+017f3cS21pFLHZzLl7gffXyXHTzNGdhUgS/WGHCiJCx9TyrXT8M4be3S3Eve6oI+6QROVVADtjHl8qrLbh1vw7iP0hJo5JmXSzEBHcZ+8BsT6/0rXUOprVo1ZYEUNMedQx3iSICjD2zTZJc1ezOCXJ51UXQq1nOaq7gbmlkPFHIdhWjtgI4UHLwis1A2BitMo+oQ/6R+lNAq/DrXAUg3AD4OQx5inniMAQ6HbfoNP8AFUl/czQZ0Pt6is5ddpJ4JdJghPqUqrOjDY2j8SAcuCzn/XJkfIAfrU8N0HDS3TFIwMhT1NYSLtLeOvgWNPZaK+mT3DappCcdM0jkF4qNjGzNGrYHiAIpVEgKRIoz4VAz8K5UWKWyTg4yDq9TUpHlyoGdcKGG59KbFctGdLbjyNT2rgut+FgKWKZDKkq5U1LinQvg3FLcU5sKMswA8yaqb/tFYWmVRu+kH3U3HzpZyjBf2YVFsruP9i+G8Xczx6rS6597CNm/3L1/WqbgfA5eBXE1nxSQSW8rh+8TCk48/Tff4UTd9qLq4JW3Kwqei8/nQcVzJKdTuS6Y3zuc1kXyoPIlFGnSetNm3+kshZz3e+SoB3I981xpXwvdoTgat8gD9qoLS7kAiVcAscM5ACgf3pXZOIT3dzLGFBjjI77unC5Gdtz7VucqVmWv0fc9yyuwCyHX4gJMtn9vauSd1bSs0ELEREBSuWKMR1zUA+jB0mThlzG8hYrurKTvv9vnt6VNFfXU0XdwW0gaM5cylQu++SdR9OvWkpXfAjrbQJpVaHu+6UMF1ZLA8yfj/RVdxONIoRJG+nBHhO5Izy96Ie9t9BaRYgz8xG5ycbbkY/WqlL0XvHIYWVUUZMeNtR5cvYn470KQ0U/omthfvMI7dHeVt9EYzo9zyFXicL4gVBu50Q+Qkxj02/zV/YWkFpBoiUDHXqadIqYBCktjPoKvHHQkp2Z1uFtg/WpjzBY0LPwadh9VMrnyLc/mK0ZBKkvzH2QBQ5LgnIGPWm0QFJmSmjmtG03EbIegfYH2PKtHZTiXh8LZ30jI+FduntmHcuqyo48SEbe9VF7cLwm7EKtiKVAwBP8Af6KEVqyqd8H8UIKNWI4qv12PWtPd3yOpOc5rMX7CSbIoylwviiSWceUq74dGZLlFxkFhVTZ4C4rSdnotd2GPJFLH9KlsNPiNHIwKk4xv0pVG52ODsKVBmYprTtRJYALxk95CMf8AMpHugP4lHTbmB8K0UckV0qSxOrLIAUIOQw8wRsaxfErfWYoWxgsPy2pvDbifgk7SQZktHfMkGdv9y+Tfr+dQUrdSKyxr2Js9JjJ3K79KH4vxq64daq0SJIS2AWo20kS8hWeJxLG+6MOeP78aq+PmFoBbmK6kdTn6m3Z/PqNutNkUlF6klTfTNXnFL++/7qc4/CPCPlQEkyRDLMoA3zmheN3TWgzdSw2MX4rmQGQ+0aZJNZ1uO8LHiW1veITZ2Nxpii99IJP5ZrHH4s59kad4rw0MfEPpEnd2UL3B/Eg8I+NbDhMaQWTyXMaQppzLJMygHHTfkK8+tO0HaG8Hd8LsLOyh5Kyx6tPrknH5Grrs/wBnpZOJxcS7Q3MvEpIjrWOWTK6uhAO2x3xgDatOLBjxyu7JzlKS/DUcVi+jxp3AZlJDFFBOBjz8vegDdRlic/aGPCcE4ORy9c86sLy2a4lM8cjFidyedMj4c08YeWJZQTgEqQ5HuK05Ma+iMZ/pW/TgJCTOE7uPC7/ZqF+JOuIlyUlGstG+fIDPzq9HZGCRSWeVCfOXP7fvTD2OtFbP0qdTpI5A8/es38TvrKbxM8sscMLmRxqyCiMN2JzmhopWivor1hqZWyw/EDsR8iasrnsNMJdcHFC8uMqLmPb5ry+VV13w/iXCyq8Qi0g8nXxI3s37bUXGS6UjKPh6LZ3WbdBGwkUDZWbDAeh5H41K3EIYlId2jPlIpX/HyJrIcGvGltTBKCTHyYcwOldueKz22Qk7aPwMAw/PetUciasyyxtOjSNxFd/roTnl4wKrJ+JnWQVT0IlBqlHaiND9YIWI84mpx7VsxPciNCfwxZ/+x/ai8iAoP8LuLvTC7JFgMPHNKdKAeW+/yqtmso+KzyRxztJPoDqxGA3oo6DGPWq+94pPLbPc3Ds6p9kMeZ5AY5VnIuIXsE4njbJXpnn5g1KWRXRfFifpftw67VzHjxjmjbGgriwm1bx7jnWg4X2zsLq3EN7OIZRt3V8oZD7Mefzz6Uc91wj6Osz3XDnyTsSSB6bNiqUmuMb+WcXTRl7a2dWCn7XlWr4GqpYmUHdjsR1A/wA5qg4jx/hjhbayW3kZiB/y0OEHmSeX61fWNwDbpHkeEbAUn2dOTkgu5fEeTy51yh3ugoOrGBz3GBz/AIpUGIAzqJblT0jXUfc70M3mwyAc4ohG1iVtgMhc45jFJ8M+FHh+9kb1LWyluwdZbuzJk4dcGFiN106o2/3L19+dYbtFw7tLfXbXN/xK5udXIRuVQAdAowPyremIljgeHGd/OpFtiCQPQU0XJcA9bujy+y7JXMsuWjCZIyx51ruGdkoISokiEjMpyzbjbbl/eVayOLxHNEd0gkU7g48+VN1sDdeFbaWaRrHGkeWZ3HhGygFt/QbY+Io8Qd2owKbbSLKGEmT4tZQfcyc4PqKfPeRLnW+k+Ro60LbInl+ijWCQRVnY8RhuohoKq+NlY4z7VR3NzDICrbjzoGS0f/r2c2PNDvqrtvp+HOCfTbayF0/e61HO2YSZAy+WcViZO0fEOGrpeTux0SVdSfPpUH/j2VA3e8Otp8jDNHOV/Y0rx2uMWn+GruZplnZY8uGzhgc/kPei7OeK9tmguI1ljfKsrDng+Vefz9v7RnZ34UQxAGPpIwMeXh2p0fbi4u/q7WKG0RgRlMs357flQhGeNty8C47cRa8UtX4bcy/QX1PG2ADvqH4TVbNxCK6HdyQhJuqMAT8POg4uJSrcBO9Lq25yd6tprGz4nB9fCrZ5ZApE+l9Vyykkt1Ln6jGf9LiphHDZxG4uFSGNdyzKcn2zUN12Xb/yl5eRKeSx3Dqo+ANUcvAJ4psuzSMDu0hLE/E0yr7A4sL4nxZ+JOEiylrGRoU7EnzP7Uy3UrksTn8qhispUA6560bDazyNp0kKKD6yseKg2CK2kiAkjDNjy60+HhdkJQXiQ95ywo5gfx+ldW0khiRihY5GcdKLljIsVufs9ziUDzA+1+Wa5IWTG2fDYluA6JpUDlV8oZMnkoHmN+VMhhCENzUjbPWnrLEkpQygHPXodqdKicnZJzTLEhwMMCfhSqRZ1V8MykeeeVdoiFXqdFZg2cnVggev8VJqK7g7YyR0NKlSoYVjM8iR6vvYJx1yCaKeZ41BXGSBuaVKiBky3DqQRjfpj1NESSMp1DY7UqVFAZQNxq4s40jSOFgSSSwOSSdR5HzJrh4rNIgLQw5z5H+aVKqMT7IjdO6glE3O+1TwzMkQ043zmuUqkUJZm75NEiIVI3yKzHEeA8PlJdodyTypUqS+lI+GafhVrE8pRT4QuN/938URaQLqChmA1dD70qVPI5Gr4ZYQxyxY1HIzljnrWiEaog056V2lUohkKVyuwxyPSoWIMWoqpJXy9KVKmFXoPEid840LgNttXYyNY8K7nB29aVKuQzJ5Z2EZOFyOuKDmuZGmijJGmRGDetKlRfoF4A2fGLhLSBQkR0ou5Bydh60w8WnD3MojiB2JAU4JwPWlSpxBh4pM0pJSPYbc9tyPP0pUqVA4/9k="}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
                />

                {/* Optional badge */}
                <span className="absolute top-2 left-2 bg-gradient-to-r from-primary to-tertiary text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full shadow-sm">
                  {heading === "New Products" ? "New" : heading === "Featured Products" ? "Featured" : "Best Seller"}
                </span>
              </div>

              {/* Name & Price */}
              <div className="mt-2 flex justify-between items-center text-xs sm:text-sm font-medium text-gray-800">
                <span className="line-clamp-1">{item.name}</span>
                <span className="text-primary font-semibold">₹{item.price}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
