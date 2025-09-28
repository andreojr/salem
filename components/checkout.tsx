import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QrCodePix } from 'qrcode-pix';
import Image from "next/image";
import { Button } from "./ui/button";


export function Checkout({ email, payment_amount, handleCancel }: { email: string, payment_amount: [number, Dispatch<SetStateAction<number>>], handleCancel: () => Promise<void> }) {
    const [pay] = payment_amount
    const [code, setCode] = useState("")
    const [qrcode, setQrCode] = useState("")
    const [copied, setCopied] = useState(false)

    const message = `Olá, nativo de Salém. Acabo de realizar o ritual de pagamento. Segue o comprovante. Que o Coven me receba. Meu e-mail é: ${email}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/5571992634457?text=${encodedMessage}`;


    function handleCopy() {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reseta a mensagem após 2s
    }

    useEffect(() => {
        const qrCodePix = QrCodePix({
            version: '01',
            key: '+5571992634457',
            name: 'Andre Luiz de Oliveira J',
            city: 'Sao Paulo',
            message: 'O coven de Salem convoca voce!',
            value: pay,
        });

        const payload = qrCodePix.payload();
        setCode(payload)
        qrCodePix.base64().then((base64) => {
            setQrCode(base64)
        })
    }, [pay])

    return (
        <div className="p-2">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <div>
                        <p className="text-xl font-bold">Aguardando pagamento via Pix</p>
                        <span className="text-sm">
                            Assim que for confirmado, a página será atualizada.
                        </span>
                    </div>

                    {qrcode && <Image src={qrcode} alt="QrCode" width={256} height={256} />}
                    <div className="flex items-center rounded-3xl bg-[#160D18] p-4 max-w-80 break-words overflow-hidden justify-center">
                        <span className="select-all text-sm font-mono text-[#C4B9B7]">{code}</span>
                    </div>
                    <Button onClick={handleCopy}>
                        {copied ? 'Código copiado!' : 'Copiar código'}
                    </Button>
                </div>

                <div className="grid gap-2">
                    <div className="">
                        <p className="text-xl font-bold">Comprou por engano?</p>
                        <span>Não esquenta! Você pode cancelar a compra.</span>
                    </div>
                    <div>
                        <Button variant="destructive" onClick={handleCancel}>
                            Cancelar compra
                        </Button>
                    </div>
                </div>

                <div className="grid gap-2">
                    <div>
                        <p className="text-xl font-bold">Já realizou o pagamento?</p>
                        <span className="text-sm">Envie-nos o comprovante para confirmamos a transação.</span>
                    </div>
                    <a href={whatsappLink} target="_blank">
                        <Button asChild variant="outline">
                            <span>Enviar comprovante</span>
                        </Button>
                    </a>
                </div>


            </div>
        </div>
    )
}