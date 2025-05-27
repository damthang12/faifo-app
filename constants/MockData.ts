import LGOHA1 from '@/assets/images/home/lam-gi-o-ha-1.png';
import LGOHA2 from '@/assets/images/home/lam-gi-o-ha-2.png';
import LGOHA3 from '@/assets/images/home/lam-gi-o-ha-3.png';
import LGOHA4 from '@/assets/images/home/lam-gi-o-ha-4.png';
import DCB1 from '@/assets/images/home/danh-cho-ban-1.png';
import DCB2 from '@/assets/images/home/danh-cho-ban-2.png';
import DCB3 from '@/assets/images/home/danh-cho-ban-3.png';
import DCB4 from '@/assets/images/home/danh-cho-ban-4.png';
import MVDL1 from '@/assets/images/home/meo-vat-du-lich-1.png';
import MVDL2 from '@/assets/images/home/meo-vat-du-lich-2.png';
import MVDL3 from '@/assets/images/home/meo-vat-du-lich-3.png';
import MVDL4 from '@/assets/images/home/meo-vat-du-lich-4.png';
import XH1 from '@/assets/images/home/xu-huong-1.png';
import XH2 from '@/assets/images/home/xu-huong-2.png';
import XH3 from '@/assets/images/home/xu-huong-3.png';
import XH4 from '@/assets/images/home/xu-huong-4.png';


import VH1 from '@/assets/images/search/van-hoa-1.png';
import VH2 from '@/assets/images/search/van-hoa-2.png';
import VH3 from '@/assets/images/search/van-hoa-3.png';
import VH4 from '@/assets/images/search/van-hoa-4.png';

import LH1 from '@/assets/images/search/le-hoi-1.png';
import LH2 from '@/assets/images/search/le-hoi-2.png';
import LH3 from '@/assets/images/search/le-hoi-3.png';
import LH4 from '@/assets/images/search/le-hoi-4.png';

import AT1 from '@/assets/images/search/am-thuc-1.png';
import AT2 from '@/assets/images/search/am-thuc-2.png';
import AT3 from '@/assets/images/search/am-thuc-3.png';
import AT4 from '@/assets/images/search/am-thuc-4.png';

import CI1 from '@/assets/images/search/checkin-1.png';
import CI2 from '@/assets/images/search/checkin-2.png';
import CI3 from '@/assets/images/search/checkin-3.png';
import CI4 from '@/assets/images/search/checkin-4.png';

import QLN1 from '@/assets/images/search/qua-luu-niem-1.png';
import QLN2 from '@/assets/images/search/qua-luu-niem-2.png';
import QLN3 from '@/assets/images/search/qua-luu-niem-3.png';
import QLN4 from '@/assets/images/search/qua-luu-niem-4.png';

import BT1 from '@/assets/images/search/bao-tang-1.png';
import BT2 from '@/assets/images/search/bao-tang-2.png';
import BT3 from '@/assets/images/search/bao-tang-3.png';
import BT4 from '@/assets/images/search/bao-tang-4.png';

import LN1 from '@/assets/images/search/lang-nghe-1.png';
import LN2 from '@/assets/images/search/lang-nghe-2.png';
import LN3 from '@/assets/images/search/lang-nghe-3.png';
import LN4 from '@/assets/images/search/lang-nghe-4.png';

import DLG1 from '@/assets/images/detail/detail-lam-gi-1.png';
import DLG2 from '@/assets/images/detail/detail-lam-gi-2.png';
import DLG3 from '@/assets/images/detail/detail-lam-gi-3.png';

import KHHA from '@/assets/images/detail/KHHA.png';


import KH1 from '@/assets/images/plan/KH1.png';
import KH2 from '@/assets/images/plan/KH2.png';
import KH3 from '@/assets/images/plan/KH3.png';
import KH4 from '@/assets/images/plan/KH4.png';
import KH5 from '@/assets/images/plan/KH5.png';
import KH6 from '@/assets/images/plan/KH6.png';
import KH7 from '@/assets/images/plan/KH7.png';
import KH8 from '@/assets/images/plan/KH8.png';
import KH9 from '@/assets/images/plan/KH9.png';
import KH10 from '@/assets/images/plan/KH10.png';
import KH11 from '@/assets/images/plan/KH11.png';
import KH12 from '@/assets/images/plan/KH12.png';
import KH13 from '@/assets/images/plan/KH13.png';


import {ImageSourcePropType} from "react-native";
import {ItineraryItem, Planning} from "@/types/type";

type Activities = {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    openTime: string;
    image: ImageSourcePropType;
    location?: string;
    expendTime?: string
};

export interface Booking {

    id: string;
    name: string;
    time: string[];
    infoCancel?: string;
    price?: string;
    originalPrice?: string;
    isCanceled?: boolean;
    isBooking?: boolean;
}

export interface Place {
    id: string;
    title: string;
    items: Item[];

}

export interface Images {
    url: string;
}

export interface Item {
    id: string;
    place: string;
    rating: number;
    reviewCount: number;
    price: string;
    openTime: string;
    image: ImageSourcePropType;
    info?: string;
    images?: Images[]
    location?: string
    category?: string;
    booking?: Booking[];
    isMaintained?: boolean;
}

export interface Trip {
    id: string;
    place?: string;
    rating?: number;
    reviewCount?: number;
    price?: string;
    openTime?: string;
    image: any;
    info?: string;
    location?: string
    name: string,
    startDate: string,
    endDate: string,
    participants: number,
    notes: string,
}

export const PLACES_SECTIONS: Place[] = [
    {
        id: 'section-1',
        title: 'Điều nên làm ở Hội An',
        items: [
            {
                id: '1',
                place: 'May đồ lấy ngay',
                rating: 4.5,
                reviewCount: 1924,
                price: 'Từ 800.000đ',
                openTime: '09:00 - 19:00',
                image: LGOHA1,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                location: "Á Đông Silk, 62 Nguyễn Thái Học",
                info: "Hội An đã từng là một thương cảng lớn, nơi các thương nhân từ khắp nơi trên thế giới đến trao đổi hàng hoá, trong đó có lụa và vải vóc. Lụa Hội An, được coi là một trong những chất liệu cao cấp, đã và đang trở thành biểu tượng của sự tinh tế trong nghề may.",
                booking: [
                    {
                        id: 'booking-001',
                        name: 'May đồ lấy ngay',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Hủy miễn phí trước 24 giờ',
                        price: '',
                        originalPrice: '800.000đ',
                    },
                    {
                        id: 'booking-002',
                        name: 'May đồ lấy ngay và thuê áo dài',
                        time: ['18:00', '19:00', '20:00'],
                        infoCancel: 'Hủy miễn phí trước 24 giờ',
                        price: '1.250.000đ',
                        originalPrice: '1.550.000đ',
                    },
                ]
            },
            {
                id: '2',
                place: 'Thả đèn hoa đăng trên sông Hoài',
                rating: 4.8,
                reviewCount: 1582,
                price: 'Từ 300.000đ',
                openTime: '18:00 - 22:00',
                image: LGOHA2,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],

                booking: [
                    {
                        id: 'booking-001',
                        name: 'Thả đèn hoa đăng trên sông Hoài',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Hủy miễn phí trước 24 giờ',
                        price: '300.000đ',
                        originalPrice: '350.000đ',
                    }
                ]
            },
            {
                id: '3',
                place: 'Thuê áo dài chụp hình ở Hội An',
                rating: 4.8,
                reviewCount: 1582,
                price: 'Từ 282.000đ',
                openTime: '18:00 - 22:00',
                image: LGOHA3,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Thuê áo dài chụp hình ở Hội An',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Hủy miễn phí trước 24 giờ',
                        price: '282.000đ',
                        originalPrice: '350.000đ',
                    }
                ]

            },
            {
                id: '4',
                place: 'Tham quan làng gốm Thanh Hà',
                rating: 4.8,
                reviewCount: 1582,
                price: 'Từ 30.000đ',
                openTime: '08:00 - 17:00',
                image: LGOHA4,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Tham quan làng gốm Thanh Hà',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Hủy miễn phí trước 24 giờ',
                        price: '',
                        originalPrice: '30.000đ',
                    }
                ]

            }
        ],

    },
    {
        id: 'section-2',
        title: 'Dành cho bạn',
        items: [
            {
                id: '5',
                place: 'Lớp học pha chế cà phê và bánh mì',
                rating: 4.9,
                reviewCount: 2033,
                price: 'Từ 100.000đ',
                openTime: '08:00 - 21:00',
                image: DCB1,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                location: "10c Bà Triệu, Phường Cẩm Phổ",
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Lớp học pha chế cà phê và bánh mì',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Hủy miễn phí trước 24 giờ',
                        price: '',
                        originalPrice: '350.000đ',
                    }
                ]


            },
            {
                id: '6',
                place: 'Tham quan nhà cổ Tấn Ký',
                rating: 5.0,
                reviewCount: 3244,
                price: 'Từ 10.000đ',
                openTime: '07:00 - 18:00',
                image: DCB2,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                location: "101 Nguyễn Thái Học, Phường Minh An",
                isMaintained: true,
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Tham quan nhà cổ Tấn Ký',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '',
                        originalPrice: '50.000đ',
                    },
                    {
                        id: 'booking-002',
                        name: 'Tham quan Nhà Cổ Tấn Ký (có thuyết minh viên Tiếng Anh/Tiếng Việt)',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '250.000đ',
                        originalPrice: '200.000đ',
                    }
                ]

            },
            {
                id: '7',
                place: 'Lớp học làm đèn lồng Hội An',
                rating: 5.0,
                reviewCount: 3244,
                price: 'Từ 10.000đ',
                openTime: '07:00 - 18:00',
                image: DCB3,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                location: "8 Trần Cao Vân, Phường Cẩm Phổ",
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Lớp học làm đèn lồng Hội An',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '',
                        originalPrice: '500.000đ',
                    }
                ]

            },
            {
                id: '8',
                place: 'Tham quan làng rau Trà Quế',
                rating: 5.0,
                reviewCount: 3244,
                price: 'Từ 10.000đ',
                openTime: '07:00 - 18:00',
                image: DCB4,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Tham quan làng rau Trà Quế',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '',
                        originalPrice: '100.000đ',
                    },
                    {
                        id: 'booking-002',
                        name: 'Tham quan làng rau Trà Quế và học nấu ăn',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '750.000đ',
                        originalPrice: '500.000đ',
                    }

                ]

            },
        ],
    },
    {
        id: 'section-3',
        title: 'Mẹo vặt du lịch',
        items: [
            {
                id: '9',
                place: 'Lên kế hoạch thông minh',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: MVDL1,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}]

            },
            {
                id: '10',
                place: 'Văn hoá địa phương',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: MVDL2,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}]

            },
            {
                id: '11',
                place: 'Di chuyển trong phố cổ',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: MVDL3,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}]

            },
            {
                id: '12',
                place: 'Ẩm thực địa phương',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: MVDL4,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}]

            },
        ],
    },
    {
        id: 'section-4',
        title: 'Xu hướng',
        items: [
            {
                id: '13',
                place: 'Show ký ức Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: XH1,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Vé xem show ký ức Hội An',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '350.000đ',
                        originalPrice: '200.000đ',
                    }
                ]

            },
            {
                id: '14',
                place: 'Khám phá chợ đêm',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: XH2,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}]

            },
            {
                id: '15',
                place: 'Tết nguyên tiêu Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: XH3,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}]

            },
            {
                id: '16',
                place: 'Chơi bài chòi',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: XH4,
                images: [{url: DLG1}, {url: DLG2}, {url: DLG3}],
                booking: [
                    {
                        id: 'booking-001',
                        name: 'Vé Chơi bài chòi Hội An',
                        time: ['09:00', '10:00', '11:00'],
                        infoCancel: 'Miễn phí huỷ đặt chỗ trước 08:00 AM ngày 10/06/2025',
                        price: '150',
                        originalPrice: '50.000đ',
                    }
                ]

            },
        ],
    },
    {
        id: 'section-5',
        title: 'Văn hoá',
        items: [
            {
                id: '14',
                place: 'Khám phá làng nghề thủ công truyền thống',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: VH1,
            },
            {
                id: '15',
                place: 'Tham quan Chùa Cầu – Biểu tượng Hội An',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: VH2,
            },
            {
                id: '16',
                place: 'Tham gia lễ hội hoa đăng',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: VH3,
            },
            {
                id: '17',
                place: 'Tham quan  nhà cổ Tấn Ký',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: VH4,
            },
        ],
    },
    {
        id: 'section-6',
        title: 'Lễ hội',
        items: [
            {
                id: '18',
                place: 'Lễ hội ánh sáng Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: LH1,
            },
            {
                id: '19',
                place: 'Lễ hội Cầu Ngư',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: LH2,
            },
            {
                id: '20',
                place: 'Lễ hội đèn lồng Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: LH3,
            },
            {
                id: '21',
                place: 'Tết nguyên tiêu Hội An',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: LH4,
            },
        ],
    },
    {
        id: 'section-7',
        title: 'Ẩm thực',
        items: [
            {
                id: '22',
                place: 'Tour ẩm thực Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: AT1,
            },
            {
                id: '23',
                place: 'Tham quan các quán cà phê đặc trưng Hội An',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: AT2,
            },
            {
                id: '24',
                place: 'Cơm gà Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: AT3,
            },
            {
                id: '25',
                place: 'Phở sắn Quế Sơn',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: AT4,
            },
        ],
    },
    {
        id: 'section-8',
        title: 'Checkin',
        items: [
            {
                id: '26',
                place: 'Bảo tàng Văn hóa Sa Huỳnh',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: CI1,
            },
            {
                id: '27',
                place: 'Hội quán Phúc Kiến',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: CI2,
            },
            {
                id: '28',
                place: 'Biển Cửa Đại',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: CI3,
            },
            {
                id: '29',
                place: 'Đình Cẩm Phô',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: CI4,
            },
        ],
    },

    {
        id: 'section-9',
        title: 'Quà lưu niệm',
        items: [
            {
                id: '30',
                place: 'Lụa Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: QLN1,
            },
            {
                id: '31',
                place: 'Gốm Thanh Hà',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: QLN2,
            },
            {
                id: '32',
                place: 'Tượng đồng Phước Kiều',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: QLN3,
            },
            {
                id: '33',
                place: 'Đồ chạm khắc gỗ Hội An',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: QLN4,
            },
        ],
    },

    {
        id: 'section-10',
        title: 'Bảo tàng',
        items: [
            {
                id: '34',
                place: 'Bảo tàng Gốm Sứ Mậu Dịch',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: BT1,
            },
            {
                id: '35',
                place: 'Bảo tàng Nghề Y truyền thống',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: BT2,
            },
            {
                id: '36',
                place: 'Bảo tàng Sa Huỳnh Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: BT3,
            },
            {
                id: '37',
                place: 'Bảo tàng văn hoá dân gian Hội An',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: BT4,
            },
        ],
    },

    {
        id: 'section-11',
        title: 'Làng nghề',
        items: [
            {
                id: '38',
                place: 'Làng lụa Hội An',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: LN1,
            },
            {
                id: '39',
                place: 'Làng mộc Kim Bồng',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: LN2,
            },
            {
                id: '40',
                place: 'Làng chài Thanh Nam',
                rating: 4.7,
                reviewCount: 843,
                price: 'Từ 500.000đ',
                openTime: 'Cả ngày',
                image: LN3,
            },
            {
                id: '41',
                place: 'Làng quất Cẩm Hà',
                rating: 4.6,
                reviewCount: 1120,
                price: 'Miễn phí',
                openTime: 'Cả ngày',
                image: LN4,
            },
        ],
    },
];

export const TRIPS: Trip[] = [
    // {
    //     id: 'trip-001',
    //     name: 'Khám phá Hội An cổ kính',
    //     startDate: '01/06/2025',
    //     endDate: '03/06/2025',
    //     participants: 2,
    //     notes: 'Thử món cao lầu, lớp làm đèn lồng, tham quan phố cổ.',
    //     image: KHHA,
    // }
];


export const ACTIVITIES_DATA: Record<any, Activities[]> = {
    'Văn hoá': [
        {
            id: '100',
            name: 'Tham quan phố cổ',
            rating: 4.6,
            reviewCount: 234,
            openTime: '07:00 - 18:00',
            expendTime: '07:30 - 09:00',
            image: KH1,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",

        },
        {
            id: '102',
            name: 'Nhà cổ Tấn Ký',
            rating: 4.8,
            reviewCount: 812,
            openTime: '06:30 - 20:00',
            image: KH2,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',


        },
        {
            id: '103',
            name: 'Chùa Cầu',
            rating: 4.8,
            reviewCount: 812,
            openTime: '06:30 - 20:00',
            image: KH3,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',


        },
    ],
    'Checkin': [
        {
            id: '104',
            name: 'Vinpearl Nam Hội An',
            rating: 4.7,
            reviewCount: 123,
            openTime: 'Mọi lúc',
            image: KH4,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
        {
            id: '105',
            name: 'Phố đèn lồng Hội An',
            rating: 4.7,
            reviewCount: 123,
            openTime: 'Mọi lúc',
            image: KH5,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
    ],
    'Ẩm thực': [
        {
            id: '106',
            name: 'Mì Quảng Hội An',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH6,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
        {
            id: '107',
            name: 'Chè Hội An',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH7,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
    ],
    'Bảo tàng': [
        {
            id: '108',
            name: 'Bảo tàng văn hoá ...',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH8,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
        {
            id: '109',
            name: 'Bảo tàng Nghề Y...',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH9,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
    ],
    'Quà lưu niệm': [
        {
            id: '200',
            name: 'Tò he đất',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH10,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
        {
            id: '201',
            name: 'Thiệp nổi Hội An',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH11,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
    ],
    'Làng nghề': [
        {
            id: '202',
            name: 'Làng gốm Thanh Hà',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH12,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
        {
            id: '203',
            name: 'Làng rau Trà Quế',
            rating: 4.5,
            reviewCount: 98,
            openTime: '08:00 - 21:00',
            image: KH13,
            location: "Á Đông Silk, 62 Nguyễn Thái Học",
            expendTime: '07:30 - 09:00',

        },
    ],
};


export const itinerarys: Planning =
    {
        id: 'itinerary-001',
        place: 'Hội An',
        startDate: '03/06/2025',
        endDate: '03/06/2025',
        participants: 2,
        notes: 'Thử món cao lầu, lớp làm đèn lồng, tham quan phố cổ.',
        image: KHHA,
        isFinished: false,
        items: [
            {
                plan: 'Lịch trình dành cho bạn (1 ngày)',
                day: '',
                itinerary: [{
                    id: '1',
                    time: '07:30 - 09:00',
                    title: 'Khám phá phố cổ Hội An',
                    location: 'Phố Cổ Hội An, Chùa Cầu, Hội Quán Phúc Kiến, Nhà Cổ Tấn Ký',
                },
                    {
                        id: '2',
                        time: '09:00 - 10:30',
                        title: 'Học làm đèn lồng',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',
                    },
                    {
                        id: '3',
                        time: '10:30 - 12:00',
                        title: 'Tham quan làng gốm Thanh Hà',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',
                    },
                    {
                        id: '4',
                        time: '12:00 - 13:30',
                        title: 'Ăn trưa tại nhà hàng địa phương',
                        location: 'Cao lầu, mỳ Quảng, Bánh bao, bánh bạc',
                    },
                    {
                        id: '5',
                        time: '13:30 - 14:30',
                        title: 'Thuê áo dài và may đồ lấy ngay',
                        location: 'A Dong Silk',
                    },
                    {
                        id: '6',
                        time: '14:30 - 16:00',
                        title: 'Lớp học pha chế cà phê và bánh mì',
                        location: 'Bánh Mì Phượng Cooking Class, Morning Glory Cooking School, The Espresso Station',
                    },
                    {
                        id: '7',
                        time: '16:30 - 17:30',
                        title: 'Tham quan vườn rau Trà Quế',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',

                    },
                    {
                        id: '8',
                        time: '18:00 - 20:00',
                        title: 'Ăn tối tại nhà hàng địa phương',
                        location: 'Cơm Gà Hội An hoặc Bánh Xèo Hội An',

                    },
                    {
                        id: '9',
                        time: '20:00 - 22:00',
                        title: 'Thả đèn hoa đăng trên sông Hoài',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',

                    },]
            }
        ],
    };



export const finishItinerarys: Planning =
    {
        id: 'itinerary-001',
        place: 'Hội An',
        startDate: '03/06/2025',
        endDate: '03/06/2025',
        participants: 2,
        notes: 'Thử món cao lầu, lớp làm đèn lồng, tham quan phố cổ.',
        image: KHHA,
        isFinished: false,
        items: [
            {
                plan: 'Lịch trình dành cho bạn (1 ngày)',

                day: '', itinerary: [{
                    id: '1',
                    time: '07:30 - 09:00',
                    title: 'Khám phá phố cổ Hội An',
                    location: 'Phố Cổ Hội An, Chùa Cầu, Hội Quán Phúc Kiến, Nhà Cổ Tấn Ký',
                },
                    {
                        id: '2',
                        time: '09:00 - 10:30',
                        title: 'Học làm đèn lồng',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',
                    },
                    {
                        id: '3',
                        time: '10:30 - 12:00',
                        title: 'Tham quan làng gốm Thanh Hà',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',
                    },
                    {
                        id: '4',
                        time: '12:00 - 13:30',
                        title: 'Ăn trưa tại nhà hàng địa phương',
                        location: 'Cao lầu, mỳ Quảng, Bánh bao, bánh bạc',
                    },
                    {
                        id: '5',
                        time: '13:30 - 14:30',
                        title: 'Thuê áo dài và may đồ lấy ngay',
                        location: 'A Dong Silk',
                    },
                    {
                        id: '6',
                        time: '14:30 - 16:00',
                        title: 'Lớp học pha chế cà phê và bánh mì',
                        location: 'Bánh Mì Phượng Cooking Class, Morning Glory Cooking School, The Espresso Station',
                    },
                    {
                        id: '7',
                        time: '16:30 - 17:30',
                        title: 'Tham quan vườn rau Trà Quế',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',

                    },
                    {
                        id: '8',
                        time: '18:00 - 20:00',
                        title: 'Ăn tối tại nhà hàng địa phương',
                        location: 'Cơm Gà Hội An hoặc Bánh Xèo Hội An',

                    },
                    {
                        id: '9',
                        time: '20:00 - 22:00',
                        title: 'Thả đèn hoa đăng trên sông Hoài',
                        location: 'Mỹ nghệ đèn lồng Hội An, A Dong Silk, Yaly Couture',

                    },]
            }
        ],
    };
